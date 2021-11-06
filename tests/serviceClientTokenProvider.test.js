const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const { ServiceClientTokenProvider } = require('../index');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

describe('serviceClientTokenProvider.js', () => {
  describe('getToken', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'SC|uEsXtFNjUbf1LEgAGeUhC3.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider();
      const secondToken = await tokenProvider();
      expect(secondToken).to.eql(initialToken);
    });
  });

  describe('getToken() function', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'SC|uEsXtFNjUbf1LEgAGeUhC3.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.getToken();
      const secondToken = await tokenProvider.getToken();
      expect(secondToken).to.eql(initialToken);
    });
  });

  describe('generateUserLoginUrl()', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'clientId.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.generateUserLoginUrl('https://redirect-url.com', 'state', 'clientId', 'user1');
      await new Promise(resolve => setTimeout(resolve, 1500));
      const secondToken = await tokenProvider.generateUserLoginUrl('https://redirect-url.com', 'state', 'clientId', 'user1');
      expect(secondToken).to.not.eql(initialToken);
    });
  });
});

