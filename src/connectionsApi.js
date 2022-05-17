const ArgumentRequiredError = require('./argumentRequiredError');
const jwtManager = require('./jwtManager');

async function getFallbackUser(httpClient) {
  const token = await httpClient.tokenProvider();
  const decodedJwt = jwtManager.decode(token);
  return decodedJwt.sub;
}

class ConnectionsApi {
  constructor(client) {
    this.client = client;
  }

  async createConnection(connection) {
    if (!connection) {
      throw new ArgumentRequiredError('connection', 'Required parameter connection was not specified when calling createConnection.');
    }

    const response = await this.client.post('/v1/connections', connection);
    return response;
  }

  async deleteConnection(connectionId) {
    if (!connectionId) {
      throw new ArgumentRequiredError('connectionId', 'Required parameter connectionId was not specified when calling deleteConnection.');
    }

    const response = await this.client.delete(`/v1/connections/${encodeURIComponent(String(connectionId))}`);
    return response;
  }

  async getConnection(connectionId) {
    if (!connectionId) {
      throw new ArgumentRequiredError('connectionId', 'Required parameter connectionId was not specified when calling getConnection.');
    }

    const response = await this.client.get(`/v1/connections/${encodeURIComponent(String(connectionId))}`);
    return response;
  }

  async getConnections() {
    const response = await this.client.get('/v1/connections/');
    return response;
  }

  async updateConnection(connectionId, connection) {
    if (!connectionId) {
      throw new ArgumentRequiredError('connectionId', 'Required parameter connectionId was not specified when calling updateConnection.');
    }

    if (!connection) {
      throw new ArgumentRequiredError('connection', 'Required parameter connection was not specified when calling updateConnection.');
    }

    const response = await this.client.put(`/v1/connections/${encodeURIComponent(String(connectionId))}`, connection);
    return response;
  }

  async getConnectionCredentials(connectionId, userId) {
    if (!connectionId) {
      throw new ArgumentRequiredError('connectionId', 'Required parameter connectionId was not specified when calling getConnectionCredentials.');
    }

    const requestUserId = userId || await getFallbackUser(this.client);

    const url = `/v1/connections/${encodeURIComponent(String(connectionId))}/users/${encodeURIComponent(String(requestUserId))}/credentials`;
    const response = await this.client.get(url);
    return response;
  }
}

module.exports = ConnectionsApi;
