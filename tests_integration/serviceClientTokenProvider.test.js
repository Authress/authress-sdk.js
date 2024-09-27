const { describe, it, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { AuthressClient } = require('../index.js');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

describe('serviceClientTokenProvider.js', () => {
  describe('tokenProvider as a function itself', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'ACCESS_KEY';
      const authressClient = new AuthressClient({ authressApiUrl: 'API_URL' }, accessKey);
      await authressClient.serviceClients.createClient({ clientId: 'Something' });
    });
  });
});
