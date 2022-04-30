/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 *
 * @export
 * @interface Tenant
 */
export interface Tenant {
  /**
   *
   * @type {string}
   * @memberof Tenant
   */
  tenantId: string;
  /**
   *
   * @type {string}
   * @memberof Tenant
   */
  tenantLookupIdentifier?: string;
  /**
   *
   * @type {TenantData}
   * @memberof Tenant
   */
  data?: TenantData;
  /**
   *
   * @type {TenantConnection}
   * @memberof Tenant
   */
  connection?: TenantConnection;
  /**
   *
   * @type {Date}
   * @memberof Tenant
   */
  createdTime?: Date;
}
/**
* A collection of tenants.
* @export
* @interface TenantCollection
*/
export interface TenantCollection {
  /**
   *
   * @type {Array<Tenant>}
   * @memberof TenantCollection
   */
  connections?: Array<Tenant>;
}
/**
*
* @export
* @interface TenantConnection
*/
export interface TenantConnection {
  /**
   *
   * @type {string}
   * @memberof TenantConnection
   */
  connectionId?: string;
}
/**
*
* @export
* @interface TenantData
*/
export interface TenantData {
  /**
   *
   * @type {string}
   * @memberof TenantData
   */
  name?: string;
}
