const ArgumentRequiredError = require('./argumentRequiredError');

class AccountsApi {
  constructor(client) {
    this.client = client;
  }

  async getAccount(accountId) {
    // verify required parameter 'accountId' is not null or undefined
    if (accountId === null || accountId === undefined) {
      throw new ArgumentRequiredError('accountId', 'Required parameter accountId was null or undefined when calling getAccount.');
    }
    const url = `/v1/accounts/${encodeURIComponent(String(accountId))}`;
    const response = await this.client.get(url);
    return response;
  }

  async getAccountIdentities() {
    const url = '/v1/identities';
    const response = await this.client.get(url);
    return response;
  }

  async getAccounts() {
    const url = '/v1/accounts';
    const response = await this.client.get(url);
    return response;
  }

  async linkIdentity(body) {
    // verify required parameter 'body' is not null or undefined
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter body was null or undefined when calling linkIdentity.');
    }
    const url = '/v1/identities';
    const response = await this.client.post(url, body);
    return response;
  }
}

module.exports = AccountsApi;
