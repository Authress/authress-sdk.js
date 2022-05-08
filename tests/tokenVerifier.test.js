const { describe, it, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const { ServiceClientTokenProvider } = require('..');

const { TokenVerifier } = require('../index');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

const customDomain = 'authress.token-validation.test';

describe('tokenVerifier.js', () => {
  describe('verifyToken', () => {
    it('Validate RS512 token works', async () => {
      const userToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6ImF0K2p3dCIsImtpZCI6IjhDVGJSVGlYMVFUcnU0QmhwYnVoNFcifQ.eyJpc3MiOiJodHRwczovL2xvZ2luLmF1dGhyZXNzLmlvIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDk1MzY2Mjc4NDQ3MjIzOTc5MTEiLCJpYXQiOjE2MzYyMDAyMjcsImV4cCI6MTYzNjI4NjYyNywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6Imdvb2dsZSIsImNsaWVudF9pZCI6IkFVVEhSRVNTIiwiYXVkIjpbImh0dHBzOi8vYXBpLmF1dGhyZXNzLmlvIl19.H26E36M5aBKqJ2IOfHtnmuaJe-2p_yWnePF55IIBpgl8BKXJAWtkHfXPnUYilb3ZyNe_5xg9Oo6VRhPs2Wp8s6OoR7Qr8JGGaMZVnVxrM83xf6JtD7q55TgA40QZrySHAMV7pmGLMCc8MqNXrYSwGsL-q4KgIC0_GyPMFHO090_EK5BUIhdYcDojAiOt8JSQ8d-u8arIO3grNkbaSLoa1Ge3Ebx1_JhQwEK-73zCTgvSdKkgYTMZCJctdR8VaeUpmapHFT78JHbG0c6VAShqwpC2aexeql-yk21m7Tb9i3ge4oJBxlqoPuwEtV5WjxlNgLb3lyW2owJnA6NijpPwNg';
      await TokenVerifier('https://login.authress.io', userToken, { verifierOptions: { currentDate: new Date('2021-11-07') } });
    }).timeout(10000);

    it('Validate EdDSA service client token', async () => {
      const accessKey = 'sc_aAKceYi7VJDCU8vB7HcTo3Q.pogP.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIDVjjrIVCH3dVRq4ixRzBwjVHSoB2QzZ2iJuHq1Wshwp';
      const publicKey = { alg: 'EdDSA', kty: 'OKP', crv: 'Ed25519', x: 'JxtSC5tZZJuaW7Aeu5Kh_3tgCpPZRkHaaFyTj5sQ3KU' };
      const tokenProvider = new ServiceClientTokenProvider(accessKey, customDomain);
      const initialToken = await tokenProvider.getToken();

      await TokenVerifier(`https://${customDomain}`, initialToken, { expectedPublicKey: publicKey, verifierOptions: { currentDate: new Date('2022-05-07') } });
    }).timeout(10000);
  });
});
