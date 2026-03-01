const base64url = require('base64url');
const { sanitizeUrl } = require('./util');

let KMSClient;
let SignCommand;
try {
  ({ KMSClient, SignCommand } = require('@aws-sdk/client-kms'));
} catch (_) { /* surfaced in constructor */ }

function getIssuer(unsanitizedAuthressCustomDomain, clientId) {
  const authressCustomDomain = sanitizeUrl(unsanitizedAuthressCustomDomain).replace(/\/+$/, '');
  return `${authressCustomDomain}/v1/clients/${encodeURIComponent(clientId)}`;
}

class KmsServiceClientTokenProvider {
  constructor({ kmsKeyArn, clientId, keyId, authressAccountId }) {
    if (!KMSClient) {
      throw new Error('KmsServiceClientTokenProvider requires @aws-sdk/client-kms. Install it: npm install @aws-sdk/client-kms');
    }

    this.kmsKeyArn = kmsKeyArn;
    this.clientId = clientId;
    this.keyId = keyId;
    this.authressAccountId = authressAccountId;
    this.authressCustomDomain = null; // injected by httpClient
    this.cachedKeyData = null;

    const region = kmsKeyArn.split(':')[3];
    this.kmsClient = new KMSClient({ region });
  }

  async getToken() {
    if (this.cachedKeyData && this.cachedKeyData.token && this.cachedKeyData.expires > Date.now() + 3600000) {
      return this.cachedKeyData.token;
    }

    // Do not set the issuer to be ${accountId}.api-region.authress.io it should always be set as the authress custom domain, the custom domain, or the generic api.authress.io one
    const useAuthressCustomDomain = this.authressCustomDomain && !this.authressCustomDomain.match(/authress\.io/);

    const now = Math.round(Date.now() / 1000);
    const jwt = {
      aud: `${this.authressAccountId}.accounts.authress.io`,
      iss: getIssuer(useAuthressCustomDomain && this.authressCustomDomain || `${this.authressAccountId}.api.authress.io`, this.clientId),
      sub: this.clientId,
      client_id: this.clientId,
      iat: now,
      // valid for 24 hours
      exp: now + 60 * 60 * 24,
      scope: 'openid'
    };

    const header = { alg: 'EdDSA', kid: this.keyId, typ: 'at+jwt' };
    const headerEncoded = base64url.encode(JSON.stringify(header));
    const payloadEncoded = base64url.encode(JSON.stringify(jwt));
    const signingInput = `${headerEncoded}.${payloadEncoded}`;

    const { Signature } = await this.kmsClient.send(new SignCommand({
      KeyId: this.kmsKeyArn,
      Message: Buffer.from(signingInput),
      SigningAlgorithm: 'ED25519_SHA_512',
      MessageType: 'RAW'
    }));

    const token = `${signingInput}.${base64url.encode(Buffer.from(Signature))}`;
    this.cachedKeyData = { token, expires: jwt.exp * 1000 };
    return token;
  }
}

module.exports = KmsServiceClientTokenProvider;
