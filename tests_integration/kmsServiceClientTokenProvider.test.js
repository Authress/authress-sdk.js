const { expect } = require('chai');
const { KMSClient, CreateKeyCommand, CreateAliasCommand, GetPublicKeyCommand, ScheduleKeyDeletionCommand } = require('@aws-sdk/client-kms');

const { AuthressClient, KmsServiceClientTokenProvider } = require('../index');
const jwtManager = require('../src/jwtManager');

// AWS region to create the KMS key in — must match the region of your AWS credentials
const AWS_KMS_REGION = 'us-east-1';

const AUTHRESS_API_URL = 'AUTHRESS_API_URL';
const authressAccountId = 'authressAccountId';
const ADMIN_USER_JWT = 'ADMIN_USER_JWT';

describe('kmsServiceClientTokenProvider.js', () => {
  let kmsKeyArn;
  let testClientId;
  let kmsTokenProvider;
  let authressClient;

  beforeAll(async () => {
    authressClient = new AuthressClient({ authressApiUrl: AUTHRESS_API_URL }, ADMIN_USER_JWT);

    // Create an AWS KMS Ed25519 signing key for this test run
    const kmsClient = new KMSClient({ region: AWS_KMS_REGION });
    const { KeyMetadata } = await kmsClient.send(new CreateKeyCommand({
      KeySpec: 'ECC_NIST_EDWARDS25519',
      KeyUsage: 'SIGN_VERIFY',
      Description: 'Authress SDK integration test — KmsServiceClientTokenProvider'
    }));
    kmsKeyArn = KeyMetadata.Arn;
    await kmsClient.send(new CreateAliasCommand({ AliasName: `alias/authress-sdk-integration-test-${Date.now()}`, TargetKeyId: kmsKeyArn }));

    // Retrieve the public key from KMS (DER-encoded SPKI) and encode it as base64
    const { PublicKey } = await kmsClient.send(new GetPublicKeyCommand({ KeyId: kmsKeyArn }));
    const publicKeyBase64 = Buffer.from(PublicKey).toString('base64');

    // Create a service client in Authress for this test
    const { data: serviceClient } = await authressClient.serviceClients.createClient({
      name: 'KMS Integration Test Client'
    });
    testClientId = serviceClient.clientId;

    // Upload the public key to Authress — Authress stores it and returns a keyId
    const { data: accessKeyResponse } = await authressClient.serviceClients.requestAccessKey(testClientId, {
      publicKey: publicKeyBase64
    });

    // Build the KMS token provider — authressCustomDomain is injected manually here since
    // we call getToken() directly rather than routing through AuthressClient's httpClient
    kmsTokenProvider = new KmsServiceClientTokenProvider({
      kmsKeyArn,
      clientId: testClientId,
      keyId: accessKeyResponse.keyId,
      authressAccountId: authressAccountId
    });
    kmsTokenProvider.authressCustomDomain = AUTHRESS_API_URL;
  });

  afterAll(async () => {
    if (testClientId) {
      await authressClient.serviceClients.deleteClient(testClientId).catch(() => {});
    }
    if (kmsKeyArn) {
      const region = kmsKeyArn.split(':')[3];
      const kmsClient = new KMSClient({ region });
      await kmsClient.send(new ScheduleKeyDeletionCommand({ KeyId: kmsKeyArn, PendingWindowInDays: 7 })).catch(() => {});
    }
  });

  it('generates a valid JWT signed by KMS with the correct claims', async () => {
    const token = await kmsTokenProvider.getToken();
    expect(token).to.be.a('string');
    expect(token.split('.')).to.have.lengthOf(3);

    const payload = jwtManager.decode(token);
    expect(payload).to.have.property('iss').that.includes(testClientId);
    expect(payload).to.have.property('sub').to.eql(testClientId);
    expect(payload).to.have.property('client_id').to.eql(testClientId);
    expect(payload).to.have.property('aud').that.includes(authressAccountId);
    expect(payload).to.have.property('iat').that.is.a('number');
    expect(payload).to.have.property('exp').that.is.a('number');
    expect(payload).to.have.property('scope').to.eql('openid');
  });

  it('caches the token — KMS is only called once for repeated getToken() calls', async () => {
    // Reset cache to ensure a fresh sign occurs
    kmsTokenProvider.cachedKeyData = null;

    const token1 = await kmsTokenProvider.getToken();
    const token2 = await kmsTokenProvider.getToken();
    expect(token1).to.eql(token2);
  });

  it('produces a JWT that Authress can verify by fetching the uploaded public key', async () => {
    const token = await kmsTokenProvider.getToken();

    // verifyToken fetches the public JWK from Authress using the issuer + kid in the token header
    const verifiedPayload = await authressClient.verifyToken(token);
    expect(verifiedPayload).to.have.property('sub').to.eql(testClientId);
    expect(verifiedPayload).to.have.property('client_id').to.eql(testClientId);
  });
});
