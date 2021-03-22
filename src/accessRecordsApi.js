const { URL, URLSearchParams } = require('url');

const ArgumentRequiredError = require('./argumentRequiredError');

class AccessRecordsApi {
  constructor(client) {
    this.client = client;
  }

  async createClaim(body) {
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter recordId is null or undefined.');
    }

    const response = await this.client.post('/v1/claims', body);
    return response;
  }

  async createRecord(body) {
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter recordId is null or undefined.');
    }

    const response = await this.client.post('/v1/records', body);
    return response;
  }

  async deleteRecord(recordId) {
    if (recordId === null || recordId === undefined) {
      throw new ArgumentRequiredError('recordId', 'Required parameter recordId was null or undefined when calling deleteRecord.');
    }

    await this.client.delete(`/v1/records/${encodeURIComponent(String(recordId))}`);
  }

  async getRecord(recordId) {
    // verify required parameter 'recordId' is not null or undefined
    if (recordId === null || recordId === undefined) {
      throw new ArgumentRequiredError('recordId', 'Required parameter recordId was null or undefined when calling getRecord.');
    }

    const response = await this.client.get(`/v1/records/${encodeURIComponent(String(recordId))}`);
    return response;
  }

  async getRecords(limit, cursor, filter, status) {
    const url = new URL(`${this.client.baseUrl}/v1/records`);
    const qs = {};
    if (limit) { qs.limit = limit; }
    if (cursor) { qs.cursor = cursor; }
    if (filter) { qs.filter = filter; }
    if (status) { qs.status = status; }
    url.search = new URLSearchParams(qs).toString();
    const response = await this.client.get(url);
    return response;
  }

  async updateRecord(recordId, body, expectedLastModifiedTime) {
    // verify required parameter 'body' is not null or undefined
    if (body === null || body === undefined) {
      throw new ArgumentRequiredError('body', 'Required parameter body was null or undefined when calling updateRecord.');
    }

    // verify required parameter 'recordId' is not null or undefined
    if (recordId === null || recordId === undefined) {
      throw new ArgumentRequiredError('recordId', 'Required parameter recordId was null or undefined when calling updateRecord.');
    }

    const headers = {};
    if (expectedLastModifiedTime) {
      headers['If-Unmodified-Since'] = typeof expectedLastModifiedTime === 'string' ? expectedLastModifiedTime : expectedLastModifiedTime.toUTCString();
    }
    const response = await this.client.put(`/v1/records/${encodeURIComponent(String(recordId))}`, body, headers);
    return response;
  }
}

module.exports = AccessRecordsApi;
