const ArgumentRequiredError = require('./argumentRequiredError');

class RolesApi {
  constructor(client) {
    this.client = client;
  }

  async deleteRole(roleId) {
    // verify required parameter 'roleId' is not null or undefined
    if (roleId === null || roleId === undefined) {
      throw new ArgumentRequiredError('roleId', 'Required parameter roleId was null or undefined when calling deleteRole.');
    }

    const url = `/v1/roles/${encodeURIComponent(String(roleId))}`;
    const response = await this.client.delete(url);
    return response;
  }

  async getRole(roleId) {
    // verify required parameter 'roleId' is not null or undefined
    if (roleId === null || roleId === undefined) {
      throw new ArgumentRequiredError('roleId', 'Required parameter roleId was null or undefined when calling getRole.');
    }

    const url = `/v1/roles/${encodeURIComponent(String(roleId))}`;
    const response = await this.client.get(url);
    return response;
  }

  async createRole(body) {
    // verify required parameter 'body' is not null or undefined
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter body was null or undefined when calling updateRole.');
    }

    const url = '/v1/roles';
    const response = await this.client.post(url, body);
    return response;
  }

  async updateRole(roleId, body) {
    // verify required parameter 'body' is not null or undefined
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter body was null or undefined when calling updateRole.');
    }
    // verify required parameter 'roleId' is not null or undefined
    if (roleId === null || roleId === undefined) {
      throw new ArgumentRequiredError('roleId', 'Required parameter roleId was null or undefined when calling updateRole.');
    }

    const url = `/v1/roles/${encodeURIComponent(String(roleId))}`;
    const response = await this.client.put(url, body);
    return response;
  }
}

module.exports = RolesApi;
