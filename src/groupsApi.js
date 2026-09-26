
const ArgumentRequiredError = require('./argumentRequiredError');

class GroupsApi {
  constructor(client) {
    this.client = client;
  }

  async createGroup(group) {
    if (!group) {
      throw new ArgumentRequiredError('group', 'Required parameter group was not specified when calling createGroup.');
    }

    const response = await this.client.post('/v1/groups', group);
    return response;
  }

  async deleteGroup(groupId) {
    if (!groupId) {
      throw new ArgumentRequiredError('groupId', 'Required parameter groupId was not specified when calling deleteGroup.');
    }

    const response = await this.client.delete(`/v1/groups/${encodeURIComponent(String(groupId))}`);
    return response;
  }

  async getGroup(groupId) {
    if (!groupId) {
      throw new ArgumentRequiredError('groupId', 'Required parameter groupId was not specified when calling getGroup.');
    }

    const response = await this.client.get(`/v1/groups/${encodeURIComponent(String(groupId))}`);
    return response;
  }

  async getGroups(limit, cursor, filter) {
    const url = new URL(`${this.client.baseUrl}/v1/groups`);
    const qs = {};
    if (limit) { qs.limit = limit; }
    if (cursor) { qs.cursor = cursor; }
    if (filter) { qs.filter = filter; }
    url.search = new URLSearchParams(qs).toString();
    const response = await this.client.get(url);
    return response;
  }

  async updateGroup(groupId, group, expectedLastModifiedTime) {
    if (!groupId) {
      throw new ArgumentRequiredError('groupId', 'Required parameter groupId was not specified when calling updateGroup.');
    }

    if (!group) {
      throw new ArgumentRequiredError('group', 'Required parameter group was not specified when calling updateGroup.');
    }

    const headers = {};
    if (expectedLastModifiedTime) {
      headers['If-Unmodified-Since'] = expectedLastModifiedTime.toISOString();
    }
    const response = await this.client.put(`/v1/groups/${encodeURIComponent(String(groupId))}`, group, headers);
    return response;
  }
}

module.exports = GroupsApi;
