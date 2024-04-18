const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const { ServiceClientTokenProvider } = require('../index');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

describe('serviceClientTokenProvider.js', () => {
  describe('tokenProvider as a function itself', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'SC|uEsXtFNjUbf1LEgAGeUhC3.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider();
      const secondToken = await tokenProvider();
      expect(secondToken).to.eql(initialToken);
    });
  });

  describe('getToken() function property', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'SC|uEsXtFNjUbf1LEgAGeUhC3.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.getToken();
      const secondToken = await tokenProvider.getToken();
      expect(secondToken).to.eql(initialToken);
    });
  });

  describe('generateUserLoginUrl()', () => {
    it('Validate that new urls are generated on every request', async () => {
      const accessKey = 'clientId.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.generateUserLoginUrl('https://login.redirect-url.com', 'state', 'clientId', 'user1');
      await new Promise(resolve => setTimeout(resolve, 1500));
      const secondToken = await tokenProvider.generateUserLoginUrl('https://login.redirect-url.com', 'state', 'clientId', 'user1');
      expect(secondToken).to.not.eql(initialToken);

      const issuer = new URL(initialToken).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(initialToken).searchParams.get('state');
      expect(state).to.eql('state');
    });

    it('Validate cache tokens work use custom domain fallback', async () => {
      const accessKey = 'clientId.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const url = await tokenProvider.generateUserLoginUrl('https://login.redirect-url.com/login', 'state', 'clientId', 'user1');
      const issuer = new URL(url).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(url).searchParams.get('state');
      expect(state).to.eql('state');
    });

    it('Validate cache tokens work use custom domain', async () => {
      const accessKey = 'clientId.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey, 'https://login.redirect-url.com');
      const url = await tokenProvider.generateUserLoginUrl('https://login.something-wrong.com/login', 'state', 'clientId', 'user1');
      const issuer = new URL(url).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(url).searchParams.get('state');
      expect(state).to.eql('state');
    });

    it('Validate authentication response from the @authress/login SDK correctly generates the correct result', async () => {
      const accessKey = 'clientId.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.generateUserLoginUrl({ authenticationUrl: 'https://login.redirect-url.com?client_id=clientId&state=state' }, 'user1');

      const issuer = new URL(initialToken).searchParams.get('iss');
      expect(issuer).to.eql('https://login.redirect-url.com/v1/clients/clientId');

      const state = new URL(initialToken).searchParams.get('state');
      expect(state).to.eql('state');
    });
  });
});

