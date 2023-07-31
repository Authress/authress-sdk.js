const ArgumentRequiredError = require('./argumentRequiredError');

class InvitesApi {
  constructor(client) {
    this.client = client;
  }

  async createInvite(invite) {
    if (invite === null || invite === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter inviteId is null or undefined.');
    }

    const response = await this.client.post('/v1/invites', invite);
    return response;
  }

  async deleteInvite(inviteId) {
    if (inviteId === null || inviteId === undefined) {
      throw new ArgumentRequiredError('inviteId', 'Required parameter inviteId was null or undefined when calling deleteInvite.');
    }

    await this.client.delete(`/v1/invites/${encodeURIComponent(String(inviteId))}`);
  }

  async respondToInvite(inviteId) {
    // verify required parameter 'inviteId' is not null or undefined
    if (inviteId === null || inviteId === undefined) {
      throw new ArgumentRequiredError('inviteId', 'Required parameter inviteId was null or undefined when calling respondToInvite.');
    }

    const response = await this.client.patch(`/v1/invites/${encodeURIComponent(String(inviteId))}`, {});
    return response;
  }

  async getInvite(inviteId) {
    // verify required parameter 'inviteId' is not null or undefined
    if (inviteId === null || inviteId === undefined) {
      throw new ArgumentRequiredError('inviteId', 'Required parameter inviteId was null or undefined when calling getInvite.');
    }

    const response = await this.client.get(`/v1/invites/${encodeURIComponent(String(inviteId))}`);
    return response;
  }
}

module.exports = InvitesApi;
