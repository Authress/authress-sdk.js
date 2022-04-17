const { describe, it, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { TokenVerifier } = require('../index');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

describe('tokenVerifier.js', () => {
  describe('verifyToken', () => {
    it('Validate RS512 token works', async () => {
      const userToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6ImF0K2p3dCIsImtpZCI6IjhDVGJSVGlYMVFUcnU0QmhwYnVoNFcifQ.eyJpc3MiOiJodHRwczovL2xvZ2luLmF1dGhyZXNzLmlvIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDk1MzY2Mjc4NDQ3MjIzOTc5MTEiLCJpYXQiOjE2MzYyMDAyMjcsImV4cCI6MTYzNjI4NjYyNywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6Imdvb2dsZSIsImNsaWVudF9pZCI6IkFVVEhSRVNTIiwiYXVkIjpbImh0dHBzOi8vYXBpLmF1dGhyZXNzLmlvIl19.H26E36M5aBKqJ2IOfHtnmuaJe-2p_yWnePF55IIBpgl8BKXJAWtkHfXPnUYilb3ZyNe_5xg9Oo6VRhPs2Wp8s6OoR7Qr8JGGaMZVnVxrM83xf6JtD7q55TgA40QZrySHAMV7pmGLMCc8MqNXrYSwGsL-q4KgIC0_GyPMFHO090_EK5BUIhdYcDojAiOt8JSQ8d-u8arIO3grNkbaSLoa1Ge3Ebx1_JhQwEK-73zCTgvSdKkgYTMZCJctdR8VaeUpmapHFT78JHbG0c6VAShqwpC2aexeql-yk21m7Tb9i3ge4oJBxlqoPuwEtV5WjxlNgLb3lyW2owJnA6NijpPwNg';
      await TokenVerifier('https://login.authress.io', userToken, { verifierOptions: { currentDate: new Date('2021-11-07') } });
    }).timeout(10000);

    it.skip('Validate EdDSA token works', async () => {
      const userToken = 'eyJhbGciOiJFZERTQSIsImtpZCI6InBYUHR0VXdXSG9lYUVHeVdmRU5oV2YiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2F1dGhyZXNzLnRva2VuLXZhbGlkYXRpb24udGVzdCIsInN1YiI6InVzZXIxMTEiLCJpYXQiOjE2MzYyMDY0MzYsImV4cCI6MTYzNjI5MjgzNiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6ImF1dGhvcml6YXRpb24tc291cmNlIiwiY2xpZW50X2lkIjoiYXV0aHJlc3Mtc2RrLmpzIiwiYXVkIjpbInRlbmFudCJdfQ.rOLSy95ZK80AktkzvAeuKQXbyHETYj2Ee5_zAJmAUpPJx0EISB3urR6RV74YJiov94jAZ7iPsR8fJ3OWiWtTDw';
      await TokenVerifier('https://login.authress.io', userToken, { verifierOptions: { currentDate: new Date('2021-11-07') } });
    }).timeout(10000);
  });
});
