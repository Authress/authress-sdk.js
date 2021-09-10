const { URL, URLSearchParams } = require('url');
const jwtManager = require('./jwtManager');

const ArgumentRequiredError = require('./argumentRequiredError');
const UnauthorizedError = require('./unauthorizedError');

async function getFallbackUser(httpClient) {
  const token = await httpClient.tokenProvider();
  const decodedJwt = jwtManager.decode(token);
  return decodedJwt.sub;
}

class UserPermissionsApi {
  constructor(client) {
    this.client = client;
  }

  async authorizeUser(userId, resourceUri, permission) {
    // verify required parameter 'userId' is not null or undefined
    let tokenUserId = userId;
    if (userId === null || userId === undefined) {
      tokenUserId = await getFallbackUser(this.client);
    }
    // verify required parameter 'resourceUri' is not null or undefined
    if (resourceUri === null || resourceUri === undefined) {
      throw new ArgumentRequiredError('resourceUri', 'Required parameter resourceUri was null or undefined when calling authorizeUser.');
    }
    // verify required parameter 'permission' is not null or undefined
    if (permission === null || permission === undefined) {
      throw new ArgumentRequiredError('permission', 'Required parameter permission was null or undefined when calling authorizeUser.');
    }
    const url = `/v1/users/${encodeURIComponent(String(tokenUserId))}/resources/${encodeURIComponent(String(resourceUri))}/permissions/${encodeURIComponent(String(permission))}`;
    try {
      const response = await this.client.get(url);
      return response;
    } catch (error) {
      if (error.status === 404) {
        throw new UnauthorizedError(tokenUserId, resourceUri, permission);
      }
      throw error;
    }
  }

  async disableUserToken(userId, tokenId) {
    // verify required parameter 'userId' is not null or undefined
    let tokenUserId = userId;
    if (userId === null || userId === undefined) {
      tokenUserId = await getFallbackUser(this.client);
    }
    // verify required parameter 'tokenId' is not null or undefined
    if (tokenId === null || tokenId === undefined) {
      throw new ArgumentRequiredError('tokenId', 'Required parameter tokenId was null or undefined when calling disableUserToken.');
    }
    const url = `/v1/users/${encodeURIComponent(String(tokenUserId))}/tokens/${encodeURIComponent(String(tokenId))}`;
    const response = await this.client.delete(url);
    return response;
  }

  async getUserPermissionsForResource(userId, resourceUri) {
    // verify required parameter 'userId' is not null or undefined
    let tokenUserId = userId;
    if (userId === null || userId === undefined) {
      tokenUserId = await getFallbackUser(this.client);
    }
    // verify required parameter 'resourceUri' is not null or undefined
    if (resourceUri === null || resourceUri === undefined) {
      throw new ArgumentRequiredError('resourceUri', 'Required parameter resourceUri was null or undefined when calling getUserPermissionsForResource.');
    }

    const url = `/v1/users/${encodeURIComponent(String(tokenUserId))}/resources/${encodeURIComponent(String(resourceUri))}/permissions`;
    const response = await this.client.get(url);
    return response;
  }

  async getUserRolesForResource(userId, resourceUri) {
    let tokenUserId = userId;
    if (userId === null || userId === undefined) {
      tokenUserId = await getFallbackUser(this.client);
    }
    // verify required parameter 'resourceUri' is not null or undefined
    if (resourceUri === null || resourceUri === undefined) {
      throw new ArgumentRequiredError('resourceUri', 'Required parameter resourceUri was null or undefined when calling getUserRolesForResource.');
    }

    const url = `/v1/users/${encodeURIComponent(String(tokenUserId))}/resources/${encodeURIComponent(String(resourceUri))}/roles`;
    const response = await this.client.get(url);
    return response;
  }

  async getUserResources(userId, resourceUri, limit, cursor, permission) {
    // verify required parameter 'userId' is not null or undefined
    let tokenUserId = userId;
    if (userId === null || userId === undefined) {
      tokenUserId = await getFallbackUser(this.client);
    }

    try {
      await this.authorizeUser(userId, resourceUri, permission);
      return {
        status: 200,
        headers: {},
        data: {
          userId: tokenUserId,
          accessToAllSubResources: true,
          resources: null
        }
      };
    } catch (error) {
      const url = new URL(`${this.client.baseUrl}/v1/users/${encodeURIComponent(String(tokenUserId))}/resources`);
      const qs = { resourceUri };
      if (limit) { qs.limit = limit; }
      if (cursor) { qs.cursor = cursor; }
      if (permission) { qs.permissions = permission; }
      url.search = new URLSearchParams(qs).toString();

      const response = await this.client.get(url);
      return response;
    }
  }

  async requestUserToken(userId, body) {
    // verify required parameter 'body' is not null or undefined
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter body was null or undefined when calling requestUserToken.');
    }
    // verify required parameter 'userId' is not null or undefined
    if (userId === null || userId === undefined) {
      throw new ArgumentRequiredError('userId', 'Required parameter userId was null or undefined when calling requestUserToken.');
    }
    const url = `/v1/users/${encodeURIComponent(String(userId))}/tokens`;
    const response = await this.client.post(url, body);
    return response;
  }
}

module.exports = UserPermissionsApi;
