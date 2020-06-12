const ArgumentRequiredError = require('./argumentRequiredError');

class ResourcesApi {
  constructor(client) {
    this.client = client;
  }

  async getResourcePermissions(resourceUri) {
    // verify required parameter 'resourceUri' is not null or undefined
    if (resourceUri === null || resourceUri === undefined) {
      throw new ArgumentRequiredError('resourceUri', 'Required parameter resourceUri was null or undefined when calling getResourcePermissions.');
    }

    const url = `/v1/resources/${encodeURIComponent(String(resourceUri))}`;
    const response = await this.client.get(url);
    return response;
  }

  async getResourceUsers(resourceUri) {
    // verify required parameter 'resourceUri' is not null or undefined
    if (resourceUri === null || resourceUri === undefined) {
      throw new ArgumentRequiredError('resourceUri', 'Required parameter resourceUri was null or undefined when calling getResourcePermissions.');
    }

    const url = `/v1/resources/${encodeURIComponent(String(resourceUri))}/users`;
    const response = await this.client.get(url);
    return response;
  }

  async getResources() {
    const url = '/v1/resources';
    const response = await this.client.get(url);
    return response;
  }

  async updateResourcePermissions(resourceUri, body) {
    // verify required parameter 'body' is not null or undefined
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter body was null or undefined when calling updateResourcePermissions.');
    }
    // verify required parameter 'resourceUri' is not null or undefined
    if (resourceUri === null || resourceUri === undefined) {
      throw new ArgumentRequiredError('resourceUri', 'Required parameter resourceUri was null or undefined when calling updateResourcePermissions.');
    }

    const url = `/v1/resources/${encodeURIComponent(String(resourceUri))}`;
    const response = await this.client.put(url, body);
    return response;
  }
}

module.exports = ResourcesApi;
