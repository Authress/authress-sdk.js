const { describe, it, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { AuthressClient } = require('../index.js');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

describe('serviceClientTokenProvider.js', () => {
  it('Create a service client', async () => {
    const accessKey = 'ACCESS_KEY';
    const authressClient = new AuthressClient({ authressApiUrl: 'API_URL' }, accessKey);
    await authressClient.serviceClients.createClient({ name: 'Javascript SDK Integration Test Client', clientId: 'Something' });
  });
});
