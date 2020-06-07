const ArgumentRequiredError = require('./argumentRequiredError');
class ServiceClientsApi {
  constructor(client) {
    this.client = client;
  }

  async createClient(body) {
    // verify required parameter 'body' is not null or undefined
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter body was null or undefined when calling createClient.');
    }

    const response = await this.client.post('/v1/clients', body);
    return response;
  }

  async deleteAccessKey(clientId, keyId) {
    // verify required parameter 'clientId' is not null or undefined
    if (clientId === null || clientId === undefined) {
      throw new ArgumentRequiredError('clientId', 'Required parameter clientId was null or undefined when calling deleteAccessKey.');
    }
    // verify required parameter 'keyId' is not null or undefined
    if (keyId === null || keyId === undefined) {
      throw new ArgumentRequiredError('keyId', 'Required parameter keyId was null or undefined when calling deleteAccessKey.');
    }

    const url = `/v1/clients/${encodeURIComponent(String(clientId))}/access-keys/${encodeURIComponent(String(keyId))}`;
    const response = await this.client.delete(url);
    return response;
  }

  async deleteClient(clientId) {
    // verify required parameter 'clientId' is not null or undefined
    if (clientId === null || clientId === undefined) {
      throw new ArgumentRequiredError('clientId', 'Required parameter clientId was null or undefined when calling deleteClient.');
    }

    const url = `/v1/clients/${encodeURIComponent(String(clientId))}`;
    const response = await this.client.delete(url);
    return response;
  }

  async getClient(clientId) {
    // verify required parameter 'clientId' is not null or undefined
    if (clientId === null || clientId === undefined) {
      throw new ArgumentRequiredError('clientId', 'Required parameter clientId was null or undefined when calling getClient.');
    }
    const url = `/v1/clients/${encodeURIComponent(String(clientId))}`;
    const response = await this.client.get(url);
    return response;
  }

  async getClients() {
    const url = '/v1/clients';
    const response = await this.client.get(url);
    return response;
  }

  async requestAccessKey(clientId) {
    // verify required parameter 'clientId' is not null or undefined
    if (clientId === null || clientId === undefined) {
      throw new ArgumentRequiredError('clientId', 'Required parameter clientId was null or undefined when calling requestAccessKey.');
    }
    const url = `/v1/clients/${encodeURIComponent(String(clientId))}/access-keys`;
    const response = await this.client.post(url);
    return response;
  }

  async updateClient(clientId, body) {
    // verify required parameter 'body' is not null or undefined
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter body was null or undefined when calling updateClient.');
    }
    // verify required parameter 'clientId' is not null or undefined
    if (clientId === null || clientId === undefined) {
      throw new ArgumentRequiredError('clientId', 'Required parameter clientId was null or undefined when calling updateClient.');
    }
    const url = `/v1/clients/${encodeURIComponent(String(clientId))}`;
    const response = await this.client.put(url, body);
    return response;
  }
}

module.exports = ServiceClientsApi;
