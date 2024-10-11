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
      const publicKey = { kid: '8CTbRTiX1QTru4Bhpbuh4W', alg: 'RS512', kty: 'RSA', n: 'yjCk8Y43Pzhdyr_qLGJWNVjnkeNXeD-NbldFVoSKn3TgtFkPCpcjFDhpBc1S3cTJwTTV2V6xppZyKVy-eaBk8QAAYv2paHI6P2I8siiQu9_z_boesXJ2Vdp4x9l0pgZJtWg3VPkCBqm_yrXzSVgT78IjceLp0Sxh4ONsGyxXyX9UVMIpbpDz0CAA3a9wX_SpzA2cGI5thrfIRGTPF_nMeqxqeKGfX2y60NRMxdmqIXu_iwblMc-uPtLU2rrccp8zFHDgFOoXi4nNR0dMyrVgmV6yc3R7Eu3vUMQUBnULSGoXkisEpQE4O4VD_q45mtSienDtkh_CO8Di1Zq2daFKHQ', e: 'AQAB' };
      await TokenVerifier('https://login.authress.io', userToken, { expectedPublicKey: publicKey, verifierOptions: { currentDate: new Date('2021-11-07') } });
    });

    it('Validate EdDSA service client token', async () => {
      const accessKey = 'sc_aAKceYi7VJDCU8vB7HcTo3Q.pogP.ignore-account-id.MC4CAQAwBQYDK2VwBCIEIDVjjrIVCH3dVRq4ixRzBwjVHSoB2QzZ2iJuHq1Wshwp';
      const publicKey = { alg: 'EdDSA', kty: 'OKP', crv: 'Ed25519', x: 'JxtSC5tZZJuaW7Aeu5Kh_3tgCpPZRkHaaFyTj5sQ3KU' };
      const tokenProvider = new ServiceClientTokenProvider(accessKey, customDomain);
      const initialToken = await tokenProvider.getToken();

      await TokenVerifier(`https://${customDomain}`, initialToken, { expectedPublicKey: publicKey, verifierOptions: { currentDate: new Date('2022-05-07') } });
    });

    it('Ensure incorrect domain specification for issuer still works', async () => {
      const accessKey = 'sc_aAKceYi7VJDCU8vB7HcTo3Q.pogP.acc0-authress-account-id.MC4CAQAwBQYDK2VwBCIEIDVjjrIVCH3dVRq4ixRzBwjVHSoB2QzZ2iJuHq1Wshwp';
      const publicKey = { alg: 'EdDSA', kty: 'OKP', crv: 'Ed25519', x: 'JxtSC5tZZJuaW7Aeu5Kh_3tgCpPZRkHaaFyTj5sQ3KU' };
      const tokenProvider = new ServiceClientTokenProvider(accessKey, 'acc0-authress-account-id.login.authress.io');
      const initialToken = await tokenProvider.getToken();

      await TokenVerifier('acc0-authress-account-id.api.authress.io', initialToken, { expectedPublicKey: publicKey, verifierOptions: { currentDate: new Date('2022-05-07') } });
    });

    it('Missing domain specification for issuer still works.', async () => {
      const accessKey = 'sc_aAKceYi7VJDCU8vB7HcTo3Q.pogP.acc0-authress-account-id.MC4CAQAwBQYDK2VwBCIEIDVjjrIVCH3dVRq4ixRzBwjVHSoB2QzZ2iJuHq1Wshwp';
      const publicKey = { alg: 'EdDSA', kty: 'OKP', crv: 'Ed25519', x: 'JxtSC5tZZJuaW7Aeu5Kh_3tgCpPZRkHaaFyTj5sQ3KU' };
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.getToken();

      await TokenVerifier('acc0-authress-account-id.api.authress.io', initialToken, { expectedPublicKey: publicKey, verifierOptions: { currentDate: new Date('2022-05-07') } });
    });

    it('Missing domain specification for issuer still works if both are incorrectly set', async () => {
      const accessKey = 'sc_aAKceYi7VJDCU8vB7HcTo3Q.pogP.acc0-authress-account-id.MC4CAQAwBQYDK2VwBCIEIDVjjrIVCH3dVRq4ixRzBwjVHSoB2QzZ2iJuHq1Wshwp';
      const publicKey = { alg: 'EdDSA', kty: 'OKP', crv: 'Ed25519', x: 'JxtSC5tZZJuaW7Aeu5Kh_3tgCpPZRkHaaFyTj5sQ3KU' };
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.getToken();

      await TokenVerifier('acc0-authress-account-id.api-eu-west.authress.io', initialToken, { expectedPublicKey: publicKey, verifierOptions: { currentDate: new Date('2022-05-07') } });
    });

    it('Ensure incorrect domain specification for issuer still works', async () => {
      const accessKey = 'sc_aAKceYi7VJDCU8vB7HcTo3Q.pogP.account.MC4CAQAwBQYDK2VwBCIEIDVjjrIVCH3dVRq4ixRzBwjVHSoB2QzZ2iJuHq1Wshwp';
      const publicKey = { alg: 'EdDSA', kty: 'OKP', crv: 'Ed25519', x: 'JxtSC5tZZJuaW7Aeu5Kh_3tgCpPZRkHaaFyTj5sQ3KU' };
      const tokenProvider = new ServiceClientTokenProvider(accessKey, 'account.login.authress.io');
      const initialToken = await tokenProvider.getToken();

      await TokenVerifier('account.api-eu-west.authress.io', initialToken, { expectedPublicKey: publicKey, verifierOptions: { currentDate: new Date('2022-05-07') } });
    });

    it('Ensure incorrect domain specification for issuer still works if both are incorrectly set', async () => {
      const accessKey = 'sc_aAKceYi7VJDCU8vB7HcTo3Q.pogP.account.MC4CAQAwBQYDK2VwBCIEIDVjjrIVCH3dVRq4ixRzBwjVHSoB2QzZ2iJuHq1Wshwp';
      const publicKey = { alg: 'EdDSA', kty: 'OKP', crv: 'Ed25519', x: 'JxtSC5tZZJuaW7Aeu5Kh_3tgCpPZRkHaaFyTj5sQ3KU' };
      const tokenProvider = new ServiceClientTokenProvider(accessKey, 'account.api-eu-west.authress.io');
      const initialToken = await tokenProvider.getToken();

      await TokenVerifier('account.api-eu-west.authress.io', initialToken, { expectedPublicKey: publicKey, verifierOptions: { currentDate: new Date('2022-05-07') } });
    });
  });
});
