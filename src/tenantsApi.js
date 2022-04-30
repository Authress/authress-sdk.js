const ArgumentRequiredError = require('./argumentRequiredError');

class TenantsApi {
  constructor(client) {
    this.client = client;
  }

  async createTenant(tenant) {
    if (!tenant) {
      throw new ArgumentRequiredError('tenant', 'Required parameter tenant was not specified when calling createTenant.');
    }

    const response = await this.client.post('/v1/tenants', tenant);
    return response;
  }

  async deleteTenant(tenantId) {
    if (!tenantId) {
      throw new ArgumentRequiredError('tenantId', 'Required parameter tenantId was not specified when calling deleteTenant.');
    }

    const response = await this.client.delete(`/v1/tenants/${encodeURIComponent(String(tenantId))}`);
    return response;
  }

  async getTenant(tenantId) {
    if (!tenantId) {
      throw new ArgumentRequiredError('tenantId', 'Required parameter tenantId was not specified when calling getTenant.');
    }

    const response = await this.client.get(`/v1/tenants/${encodeURIComponent(String(tenantId))}`);
    return response;
  }

  async getTenants() {
    const response = await this.client.get('/v1/tenants');
    return response;
  }

  async updateTenant(tenantId, tenant) {
    if (!tenantId) {
      throw new ArgumentRequiredError('tenantId', 'Required parameter tenantId was not specified when calling updateTenant.');
    }

    if (!tenant) {
      throw new ArgumentRequiredError('tenant', 'Required parameter tenant was not specified when calling updateTenant.');
    }

    const response = await this.client.put(`/v1/tenants/${encodeURIComponent(String(tenantId))}`, tenant);
    return response;
  }
}

module.exports = TenantsApi;
