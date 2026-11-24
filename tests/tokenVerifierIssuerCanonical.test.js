const { expect } = require('chai');
const { SignJWT, generateKeyPair, exportJWK } = require('jose');
const { createTestServer } = require('./helpers/testServer');
const { TokenVerifier } = require('..');

const clientId = 'client_abc';

let server;
let baseUrl;
let signingKey;
let publicJwk;

beforeAll(async () => {
  const { publicKey, privateKey } = await generateKeyPair('EdDSA', { crv: 'Ed25519' });
  signingKey = privateKey;
  publicJwk = { ...await exportJWK(publicKey), alg: 'EdDSA' };
});

beforeEach(async () => {
  server = createTestServer();
  const info = await server.start();
  baseUrl = info.baseUrl;
  server.onRequest('GET', /\.well-known\/openid-configuration\/jwks/, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ keys: [{ ...publicJwk, kid: req.url.match(/kid=([^&]+)/)[1] }] }));
  });
});

afterEach(async () => {
  await server.close();
});

async function verifyOutcome(issuerPath, sub, kid, userinfo = '') {
  const token = await new SignJWT({}).setProtectedHeader({ alg: 'EdDSA', kid })
    .setIssuer(`${baseUrl.replace('://', `://${userinfo}`)}${issuerPath}`).setSubject(sub).setIssuedAt().setExpirationTime('1h').sign(signingKey);
  try {
    const payload = await TokenVerifier(baseUrl, token);
    return { accepted: payload };
  } catch (error) {
    return { rejected: error };
  }
}

const cases = [
  { label: 'service client token with its own sub', issuerPath: `/v1/clients/${clientId}`, sub: clientId, expected: 'accepted' },
  { label: 'service client token claiming another sub', issuerPath: `/v1/clients/${clientId}`, sub: 'user_alice', expected: 'rejected' },
  { label: 'issuer with no path', issuerPath: '', sub: 'user_alice', expected: 'accepted' },
  { label: 'issuer with an arbitrary non-client path', issuerPath: '/tenant/custom', sub: 'user_alice', expected: 'accepted' },
  { label: 'service client with trailing slash and its own sub', issuerPath: `/v1/clients/${clientId}/`, sub: clientId, expected: 'accepted' },
  { label: 'service client with trailing slash claiming another sub', issuerPath: `/v1/clients/${clientId}/`, sub: 'user_alice', expected: 'rejected' },
  { label: 'trailing dot segment hides the client id', issuerPath: `/v1/clients/${clientId}/.`, sub: 'user_alice', expected: 'rejected' },
  { label: 'dot segment inside the path', issuerPath: `/v1/./clients/${clientId}`, sub: clientId, expected: 'rejected' },
  { label: 'parent segment redirects the client id after the sub match', issuerPath: `/v1/clients/user_alice/../${clientId}`, sub: 'user_alice', expected: 'rejected' },
  { label: 'parent segment moves the path out of the clients prefix', issuerPath: `/v1/x/../clients/${clientId}`, sub: 'user_alice', expected: 'rejected' },
  { label: 'percent-encoded dot segment', issuerPath: `/v1/clients/${clientId}/%2e`, sub: 'user_alice', expected: 'rejected' },
  { label: 'backslash treated as a path separator', issuerPath: `/v1/clients/${clientId}\\.`, sub: 'user_alice', expected: 'rejected' },
  { label: 'query appended to the issuer swallows the jwks path', issuerPath: '/v1/clients/user_alice?', sub: 'user_alice', expected: 'rejected' },
  { label: 'fragment appended to the issuer swallows the jwks path', issuerPath: `/v1/clients/${clientId}#`, sub: clientId, expected: 'rejected' },
  { label: 'issuer with a deep non-client path', issuerPath: '/a/b/c/d', sub: 'user_alice', expected: 'accepted' },
  { label: 'issuer with a version-like dotted segment', issuerPath: '/v1.0/tenants/acme', sub: 'user_alice', expected: 'accepted' },
  { label: 'issuer with deep path and trailing slash', issuerPath: '/a/b/c/', sub: 'user_alice', expected: 'accepted' },
  { label: 'client path nested below another prefix is not a service client issuer', issuerPath: `/tenant/v1/clients/${clientId}`, sub: 'user_alice', expected: 'accepted' },
  { label: 'client path with extra segment is not a service client issuer', issuerPath: `/v1/clients/${clientId}/extra`, sub: 'user_alice', expected: 'accepted' },
  { label: 'empty segment in a non-client path', issuerPath: '/tenant//custom', sub: 'user_alice', expected: 'rejected' },
  { label: 'double trailing slash', issuerPath: `/v1/clients/${clientId}//`, sub: 'user_alice', expected: 'rejected' },
  { label: 'trailing newline', issuerPath: `/v1/clients/${clientId}\n`, sub: 'user_alice', expected: 'rejected' },
  { label: 'percent-encoded slash in a segment', issuerPath: '/tenant/a%2Fb', sub: 'user_alice', expected: 'rejected' },
  { label: 'percent-encoded backslash in a segment', issuerPath: '/tenant/a%5cb', sub: 'user_alice', expected: 'rejected' },
  { label: 'parent segment in a non-client path', issuerPath: '/a/b/../c', sub: 'user_alice', expected: 'rejected' },
  { label: 'issuer with userinfo', issuerPath: `/v1/clients/${clientId}`, userinfo: 'user@', sub: clientId, expected: 'rejected' }
];

describe('tokenVerifier.js issuer canonical form', () => {
  it.each(cases)('$label', async ({ label, issuerPath, sub, userinfo, expected }) => {
    const outcome = await verifyOutcome(issuerPath, sub, `kid-${cases.findIndex(c => c.label === label)}`, userinfo);
    expect(Object.keys(outcome)).to.eql([expected]);
    if (expected === 'rejected') {
      expect(server.requests).to.eql([]);
    }
  });

  it('jwks is fetched from the client path for a trailing slash issuer with its own sub', async () => {
    const outcome = await verifyOutcome(`/v1/clients/${clientId}/`, clientId, 'kid-mechanism');
    expect(Object.keys(outcome)).to.eql(['accepted']);
    expect(server.requests.map(r => r.url.split('?')[0])).to.eql([`/v1/clients/${clientId}/.well-known/openid-configuration/jwks`]);
  });
});
