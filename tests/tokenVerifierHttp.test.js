const { expect } = require('chai');
const { createTestServer } = require('./helpers/testServer');
const { AuthressClient, ServiceClientTokenProvider, TokenVerifier } = require('..');

const accessKey = 'sc_aAKceYi7VJDCU8vB7HcTo3Q.pogP.ignore-account-id.MC4CAQAwBQYDK2VwBCIEIDVjjrIVCH3dVRq4ixRzBwjVHSoB2QzZ2iJuHq1Wshwp';
const publicKey = { alg: 'EdDSA', kty: 'OKP', crv: 'Ed25519', kid: 'pogP', x: 'JxtSC5tZZJuaW7Aeu5Kh_3tgCpPZRkHaaFyTj5sQ3KU' };

let server;
let baseUrl;

beforeEach(async () => {
  server = createTestServer();
  const info = await server.start();
  baseUrl = info.baseUrl;
});

afterEach(async () => {
  await server.close();
});

describe('tokenVerifier.js e2e HTTP', () => {
  describe('standalone path (string domain)', () => {
    it('fetches JWKS from the issuer URL and verifies the token', async () => {
      // Serve the JWKS endpoint at the path the tokenVerifier will request
      server.onRequest('GET', /\.well-known\/openid-configuration\/jwks/, (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ keys: [publicKey] }));
      });

      // Generate a valid token with issuer pointing to the test server
      const tokenProvider = new ServiceClientTokenProvider(accessKey, baseUrl);
      const token = await tokenProvider.getToken();

      // Call TokenVerifier with a string domain -- this uses the standalone HTTP client
      const result = await TokenVerifier(baseUrl, token);

      expect(result).to.have.property('sub', 'sc_aAKceYi7VJDCU8vB7HcTo3Q');
      expect(result).to.have.property('iss');

      // Verify the HTTP request was made correctly
      expect(server.requests).to.have.length(1);
      expect(server.requests[0].method).to.eql('GET');
      expect(server.requests[0].url).to.include('.well-known/openid-configuration/jwks');
      expect(server.requests[0].url).to.include('kid=pogP');
      // Standalone client should NOT send Authorization header
      expect(server.requests[0].headers).to.not.have.property('authorization');
    });
  });

  describe('standalone path error handling', () => {
    it('throws when JWKS endpoint returns an HTTP error', async () => {
      server.respondWith('GET', /\.well-known\/openid-configuration\/jwks/, 500, { title: 'Internal Server Error' });

      const tokenProvider = new ServiceClientTokenProvider(accessKey, baseUrl);
      const token = await tokenProvider.getToken();

      try {
        await TokenVerifier(baseUrl, token);
        expect.fail('should have thrown');
      } catch (error) {
        expect(error).to.have.property('status', 500);
      }
    });

    it('throws when JWKS endpoint returns a 4xx error', async () => {
      server.respondWith('GET', /\.well-known\/openid-configuration\/jwks/, 400, { title: 'Bad Request' });

      const tokenProvider = new ServiceClientTokenProvider(accessKey, baseUrl);
      const token = await tokenProvider.getToken();

      try {
        await TokenVerifier(baseUrl, token);
        expect.fail('should have thrown');
      } catch (error) {
        expect(error).to.have.property('status', 400);
      }
    });

    it('throws when JWKS endpoint is unreachable (network error)', async () => {
      // Generate token pointing to a port that is not listening
      const unreachableUrl = 'http://127.0.0.1:1';
      const tokenProvider = new ServiceClientTokenProvider(accessKey, unreachableUrl);
      const token = await tokenProvider.getToken();

      try {
        await TokenVerifier(unreachableUrl, token);
        expect.fail('should have thrown');
      } catch (error) {
        expect(error).to.have.property('message');
      }
    });
  });

  describe('HttpClient path (via AuthressClient)', () => {
    it('fetches JWKS through HttpClient and verifies the token', async () => {
      // Serve the JWKS endpoint
      server.onRequest('GET', /\.well-known\/openid-configuration\/jwks/, (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ keys: [publicKey] }));
      });

      // Generate a valid token
      const tokenProvider = new ServiceClientTokenProvider(accessKey, baseUrl);
      const token = await tokenProvider.getToken();

      // Create AuthressClient -- verifyToken() passes the HttpClient to TokenVerifier
      const authressClient = new AuthressClient({ baseUrl }, accessKey);
      const result = await authressClient.verifyToken(token);

      expect(result).to.have.property('sub', 'sc_aAKceYi7VJDCU8vB7HcTo3Q');

      // Verify the JWKS request was made
      const jwksRequest = server.requests.find(r => r.url.includes('.well-known/openid-configuration/jwks'));
      expect(jwksRequest).to.not.eql(undefined);
      expect(jwksRequest.method).to.eql('GET');
      // HttpClient path sends { Authorization: undefined } which should suppress the header
      expect(jwksRequest.headers).to.not.have.property('authorization');
    });
  });
});
