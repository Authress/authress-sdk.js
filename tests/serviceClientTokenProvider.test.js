const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const { ServiceClientTokenProvider } = require('../index');
const ArgumentRequiredError = require('../src/argumentRequiredError');
const jwtManager = require('../src/jwtManager');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

describe('serviceClientTokenProvider.js', () => {
  describe('getToken() function property', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'sc_service_client.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.getToken();
      const secondToken = await tokenProvider.getToken();
      expect(secondToken).to.eql(initialToken);
    });

    it('inject custom header properties and payload claims', async () => {
      const accessKey = 'sc_service_client.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);

      const claim = 'https://custom-claim.com';
      const value = { data: 'value' };
      const result = await tokenProvider.getToken({ jwtOverrides: { payload: { [claim]: value } } });

      const jwtPayload = jwtManager.decode(result);
      expect(jwtPayload[claim]).to.eql(value);

      expect(jwtPayload).to.have.property('aud').to.eql('acc-test_account_id.accounts.authress.io');
      expect(jwtPayload).to.have.property('iss').to.eql('https://acc-test_account_id.api.authress.io/v1/clients/sc_service_client');
      expect(jwtPayload).to.have.property('sub').to.eql('sc_service_client');
      expect(jwtPayload).to.have.property('client_id').to.eql('sc_service_client');
      expect(jwtPayload).to.have.property('iat').that.is.a('number');
      expect(jwtPayload).to.have.property('exp').that.is.a('number');
      expect(jwtPayload).to.have.property('scope').to.eql('openid');
    });
  });

  describe('generateUserLoginUrl()', () => {
    it('Validate that new urls are generated on every request', async () => {
      const clock = sandbox.useFakeTimers();

      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.generateUserLoginUrl('https://login.redirect-url.com', 'state', 'clientId', 'user1');
      await clock.tick(1500);
      const secondToken = await tokenProvider.generateUserLoginUrl('https://login.redirect-url.com', 'state', 'clientId', 'user1');
      expect(secondToken).to.not.eql(initialToken);

      const issuer = new URL(initialToken).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(initialToken).searchParams.get('state');
      expect(state).to.eql('state');
      clock.restore();
    });

    it('Validate cache tokens work use custom domain fallback', async () => {
      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const url = await tokenProvider.generateUserLoginUrl('https://login.redirect-url.com/login', 'state', 'clientId', 'user1');
      const issuer = new URL(url).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(url).searchParams.get('state');
      expect(state).to.eql('state');
    });

    it('Validate cache tokens work use custom domain', async () => {
      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey, 'https://login.redirect-url.com');
      const url = await tokenProvider.generateUserLoginUrl('https://login.something-wrong.com/login', 'state', 'clientId', 'user1');
      const issuer = new URL(url).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(url).searchParams.get('state');
      expect(state).to.eql('state');
    });

    it('Validate authentication response from the @authress/login SDK correctly generates the correct result', async () => {
      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.generateUserLoginUrl({ authenticationUrl: 'https://login.redirect-url.com?client_id=clientId&state=state' }, 'user1');

      const issuer = new URL(initialToken).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(initialToken).searchParams.get('state');
      expect(state).to.eql('state');
    });

    it('Should throw an error if authressCustomDomainLoginUrl is not provided', async () => {
      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const serviceClientTokenProvider = new ServiceClientTokenProvider(accessKey);

      try {
        await serviceClientTokenProvider.generateUserLoginUrl(null, 'state', 'clientId', 'user1');
      } catch (error) {
        expect(error).to.be.instanceOf(ArgumentRequiredError);
        expect(error.message).to.eql('The authressCustomDomainLoginUrl is not specified in the incoming login request, this should match the configured Authress custom domain.');
      }
    });

    it('Should correctly parse parameters from an authenticationUrl object input', async () => {
      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const serviceClientTokenProvider = new ServiceClientTokenProvider(accessKey);

      const url = await serviceClientTokenProvider.generateUserLoginUrl({ authenticationUrl: 'https://login.redirect-url.com?client_id=clientId&state=state' }, 'user1');
      const issuer = new URL(url).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(url).searchParams.get('state');
      expect(state).to.eql('state');
    });

    it('Should throw an error if state is not provided', async () => {
      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const serviceClientTokenProvider = new ServiceClientTokenProvider(accessKey);

      try {
        await serviceClientTokenProvider.generateUserLoginUrl('https://login.redirect-url.com', null, 'clientId', 'user1');
      } catch (error) {
        expect(error).to.be.instanceOf(ArgumentRequiredError);
        expect(error.message).to.eql('The state is required to generate a authorization code redirect for is required, and should be present in the authenticationUrl.');
      }
    });

    it('Should throw an error if clientId does not match the decodedAccessKey clientId', async () => {
      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const serviceClientTokenProvider = new ServiceClientTokenProvider(accessKey);

      try {
        await serviceClientTokenProvider.generateUserLoginUrl('https://login.redirect-url.com', 'state', 'wrongClientId', 'user1');
      } catch (error) {
        expect(error).to.be.instanceOf(ArgumentRequiredError);
        expect(error.message).to.eql('The clientId should be specified in the authenticationUrl. It should match the service client ID.');
      }
    });

    it('Should throw an error if userId is not provided', async () => {
      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const serviceClientTokenProvider = new ServiceClientTokenProvider(accessKey);

      try {
        await serviceClientTokenProvider.generateUserLoginUrl('https://login.redirect-url.com', 'state', 'clientId', null);
      } catch (error) {
        expect(error).to.be.instanceOf(ArgumentRequiredError);
        expect(error.message).to.eql('The user to generate an authorization code redirect for is required.');
      }
    });

    it('Should generate a URL with the correct authorization code and parameters', async () => {
      const accessKey = 'clientId.uDeF.acc-test_account_id.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const serviceClientTokenProvider = new ServiceClientTokenProvider(accessKey);

      const url = await serviceClientTokenProvider.generateUserLoginUrl('https://login.redirect-url.com', 'state', 'clientId', 'user1');

      const code = new URL(url).searchParams.get('code');
      expect(code).to.not.be.null;

      const jwtPayload = jwtManager.decode(code);
      expect(jwtPayload).to.have.property('aud').to.eql('acc-test_account_id.accounts.authress.io');
      expect(jwtPayload).to.have.property('iss').to.eql('https://login.redirect-url.com/v1/clients/clientId');
      expect(jwtPayload).to.have.property('sub').to.eql('user1');
      expect(jwtPayload).to.have.property('client_id').to.eql('clientId');
      expect(jwtPayload).to.have.property('iat').that.is.a('number');
      expect(jwtPayload).to.have.property('exp').that.is.a('number');
      expect(jwtPayload).to.have.property('scope').to.eql('openid');

      const issuer = new URL(url).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(url).searchParams.get('state');
      expect(state).to.eql('state');
    });
  });
});
