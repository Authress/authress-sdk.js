const ArgumentRequiredError = require('./argumentRequiredError');

class ExtensionsApi {
  constructor(client) {
    this.client = client;
  }

  async createExtension(extension) {
    if (!extension) {
      throw new ArgumentRequiredError('extension', 'Required parameter extension was not specified when calling createExtension.');
    }

    const response = await this.client.post('/v1/extensions', extension);
    return response;
  }

  async deleteExtension(extensionId) {
    if (!extensionId) {
      throw new ArgumentRequiredError('extensionId', 'Required parameter extensionId was not specified when calling deleteExtension.');
    }

    const response = await this.client.delete(`/v1/extensions/${encodeURIComponent(String(extensionId))}`);
    return response;
  }

  async getExtension(extensionId) {
    if (!extensionId) {
      throw new ArgumentRequiredError('extensionId', 'Required parameter extensionId was not specified when calling getExtension.');
    }

    const response = await this.client.get(`/v1/extensions/${encodeURIComponent(String(extensionId))}`);
    return response;
  }

  async getExtensions() {
    const response = await this.client.get('/v1/extensions/');
    return response;
  }

  async updateExtension(extensionId, extension) {
    if (!extensionId) {
      throw new ArgumentRequiredError('extensionId', 'Required parameter extensionId was not specified when calling updateExtension.');
    }

    if (!extension) {
      throw new ArgumentRequiredError('extension', 'Required parameter extension was not specified when calling updateExtension.');
    }

    const response = await this.client.put(`/v1/extensions/${encodeURIComponent(String(extensionId))}`, extension);
    return response;
  }
}

module.exports = ExtensionsApi;
