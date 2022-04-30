/* eslint-disable node/no-missing-import */
import { Response } from '../response';
import { Tenant, TenantCollection } from './dtos';

/**
 * TenantsApi
 * @export
 */
export interface TenantsApi {
  /**
   * Specify identity tenant details for Authress identity aggregation.
   * @summary Create SSO tenant
   * @param {Tenant} body
   * @throws {RequiredError}
   */
  createTenant(body: Tenant): Promise<Response<Tenant>>;

  /**
   * Delete an identity tenant details for Authress identity aggregation.
   * @summary Delete SSO tenant
   * @param {string} tenantId The tenant identifier.
   * @throws {RequiredError}
   */
  deleteTenant(tenantId: string): Promise<Response<void>>;

  /**
  * Specify identity tenant details for Authress identity aggregation.
  * @summary Update SSO tenant
  * @param {Tenant} body
  * @param {string} tenantId The tenant identifier.
  * @throws {RequiredError}
  */
  updateTenant(tenantId: string, body: Tenant): Promise<Response<Tenant>>;

  /**
   * Get the identity tenant details for Authress identity aggregation.
   * @summary Retrieve SSO tenant
   * @param {string} tenantId The tenant identifier.
   * @throws {RequiredError}
   */
  getTenant(tenantId: string): Promise<Response<Tenant>>;

  /**
   * Returns a paginated tenant list for the account. Only tenants the user has access to are returned.
   * @summary List SSO tenants
   * @throws {RequiredError}
   */
  getTenants(): Promise<Response<TenantCollection>>;
}
