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

  async getConnectionCredentials(connectionId, userId) {
    if (!connectionId) {
      throw new ArgumentRequiredError('connectionId', 'Required parameter connectionId was not specified when calling getRole.');
    }

    const requestUserId = userId || await getFallbackUser(this.client);

    const url = `/v1/connections/${encodeURIComponent(String(connectionId))}/users/${encodeURIComponent(String(requestUserId))}/credentials`;
    const response = await this.client.get(url);
    return response;
  }
}

module.exports = ConnectionsApi;
