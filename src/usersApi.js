const ArgumentRequiredError = require('./argumentRequiredError');

class UsersApi {
  constructor(client) {
    this.client = client;
  }

  async getUser(userId) {
    // verify required parameter 'userId' is not null or undefined
    if (userId === null || userId === undefined) {
      throw new ArgumentRequiredError('userId', 'Required parameter userId was null or undefined when calling getUser.');
    }
    const url = `/v1/users/${encodeURIComponent(String(userId))}`;
    const response = await this.client.get(url);
    return response;
  }
}

module.exports = UsersApi;
