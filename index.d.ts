/* eslint-disable node/no-missing-import */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-shadow */

import { AuthenticateResponse } from '@authress/login';

import { Response, IPaginated, Links, Cursor, AccountLink } from './src/response';

import { ConnectionsApi } from './src/connections/api';
export * from './src/connections/api';
export * from './src/connections/dtos';

import { TenantsApi } from './src/tenants/api';
export * from './src/tenants/api';
export * from './src/tenants/dtos';

import { ExtensionsApi } from './src/extensions/api';
export * from './src/extensions/api';
export * from './src/extensions/dtos';

import { UserPermissionsApi } from './src/userPermissions/api';
import { UserRoleCollection, PermissionObject } from './src/userPermissions/dtos';
export * from './src/userPermissions/api';
export * from './src/userPermissions/dtos';

import { InvitesApi } from './src/invites/api';
import { Statement, LinkedGroup, User } from './src/records/dtos';
export * from './src/invites/api';
export * from './src/invites/dtos';

/**
 * The Authress SDK primary settings object to be used with new AuthressClient.
 * @export
 * @interface AuthressSettings
 */
export interface AuthressSettings {
  /**
   * @deprecated Use the @see authressApiUrl property instead
   */
  baseUrl?: string;

  /**
   * Authress baseUrl => API Host: https://authress.io/app/#/api?route=overview
   * @type {string}
   * @memberof AuthressSettings
   */
  authressApiUrl?: string;

  /**
   * Set a custom user agent to identify this client, this is helpful for debugging problems and creating support tickets in the Authress Support Portal.
   * @type {string}
   * @memberof AuthressSettings
   */
  userAgent?: string;
}

/**
 * The access record which links users to roles.
 * @export
 * @interface AccessRecord
 */
export interface AccessRecord {
  /**
   * Unique identifier for the record, can be specified on record creation.
   * @type {string}
   * @memberof AccessRecord
   */
  recordId?: string;
  /**
   * A helpful name for this record
   * @type {string}
   * @memberof AccessRecord
   */
  name: string;
  /**
   * More details about this record
   * @type {string}
   * @memberof AccessRecord
   */
  description?: string;
  /**
   * Current status of the access record.
   * @type {string}
   * @memberof AccessRecord
   */
  status?: AccessRecord.StatusEnum;
  /**
   *
   * @type {AccountLink}
   * @memberof AccessRecord
   */
  account?: AccountLink;
  /**
   * The list of users this record applies to. Users can either be specified at the record level or at the statement level.
   * @type {Array<User>}
   * @memberof AccessRecord
   */
  users?: Array<User>;
  /**
   * The list of admin that can edit this record even if they do not have global record edit permissions. By default the creator of the record has admin access unless explicitly this property is set.
   * @type {Array<User>}
   * @memberof AccessRecord
   */
  admins?: Array<User>;
  /**
  * The list of groups this record applies to. Users in these groups will be receive access to the resources listed. Groups can either be specified at the record level or at the statement level.
  * @type {Array<LinkedGroup>}
  * @memberof AccessRecord
  */
  groups?: Array<LinkedGroup>;
  /**
   * A list of statements which match roles to resources. Users in this record have all statements apply to them
   * @type {Array<Statement>}
   * @memberof AccessRecord
   */
  statements: Array<Statement>;
  /**
   * The ISO8601 expected datetime of the last time an update to the record occurred.
   * @type {string}
   * @memberof AccessRecord
   */
  lastUpdated?: string;
  /**
   *
   * @type {Links}
   * @memberof AccessRecord
   */
  links?: Links;
}

/**
 * @export
 * @namespace AccessRecord
 */
export namespace AccessRecord {
    /**
     * @export
     * @enum {string}
     */
    export enum StatusEnum {
        ACTIVE = 'ACTIVE',
        DELETED = 'DELETED'
    }
}
/**
 * A collection of access records
 * @export
 * @interface AccessRecordCollection
 */
export interface AccessRecordCollection extends IPaginated<AccessRecordCollection> {
    /**
     *
     * @type {Array<AccessRecord>}
     * @memberof AccessRecordCollection
     */
    records: Array<AccessRecord>;
}

/**
 *
 * @export
 * @interface Account
 */
export interface Account {
    /**
     *
     * @type {string}
     * @memberof Account
     */
    accountId: string;
    /**
     *
     * @type {Date}
     * @memberof Account
     */
    createdTime?: Date;
    /**
     * The top authress sub domain specific for this account to be used with this API.
     * @type {string}
     * @memberof Account
     */
    domain: string;
    /**
     *
     * @type {Record<string, unknown>}
     * @memberof Account
     */
    company: Record<string, unknown>;
    /**
     *
     * @type {Links}
     * @memberof Account
     */
    links?: Links;
}
/**
 *
 * @export
 * @interface AccountCollection
 */
export interface AccountCollection {
    /**
     *
     * @type {Array<Account>}
     * @memberof AccountCollection
     */
    accounts: Array<Account>;
}

/**
 *
 * @export
 * @interface ClaimRequest
 */
export interface ClaimRequest {
    /**
     * The parent resource to add a sub-resource to. The resource must have a resource configuration that add the permission CLAIM for this to work.
     * @type {string}
     * @memberof ClaimRequest
     */
    collectionResource: string;
    /**
     * The sub-resource the user is requesting Admin ownership over.
     * @type {string}
     * @memberof ClaimRequest
     */
    resourceId: string;
}

/**
 *
 * @export
 * @interface ClaimRequest
 */
export interface ClaimRequest {
    /**
     * The parent resource to add a sub-resource to. The resource must have a resource configuration that add the permission CLAIM for this to work.
     * @type {string}
     * @memberof ClaimRequest
     */
    collectionResource: string;
    /**
     * The sub-resource the user is requesting Admin ownership over.
     * @type {string}
     * @memberof ClaimRequest
     */
    resourceId: string;
}
/**
 *
 * @export
 * @interface ClaimResponse
 */
export interface ClaimResponse {
}

/**
 * A client configuration.
 * @export
 * @interface ClientAccessKey
 */
export interface ClientAccessKey {
    /**
     * The unique id of the client.
     * @type {string}
     * @memberof ClientAccessKey
     */
    keyId?: string;
    /**
     * The unique id of the client.
     * @type {string}
     * @memberof ClientAccessKey
     */
    clientId: string;
    /**
     *
     * @type {Date}
     * @memberof ClientAccessKey
     */
    generationDate?: Date;
    /**
     * An encoded access key which contains identifying information for client access token creation. For direct use with the Authress SDKs, not meant to be decoded. Must be saved on created, as it will never be returned from the API ever again. Authress only saved the corresponding public key to verify private access keys.
     * @type {string}
     * @memberof ClientAccessKey
     */
    accessKey?: string;
}

/**
 * The identifying information which uniquely links a JWT OIDC token to an identity provider
 * @export
 * @interface Identity
 */
export interface Identity {
    /**
     * The issuer of the JWT token. This can be any OIDC compliant provider.
     * @type {string}
     * @memberof Identity
     */
    issuer: string;
    /**
     * The audience of the JWT token. This can be either an audience for your entire app, or one particular audience for it. If there is more than one audience, multiple identities can be created.
     * @type {string}
     * @memberof Identity
     */
    audience: string;
}
/**
 *
 * @export
 * @interface IdentityCollection
 */
export interface IdentityCollection {
    /**
     *
     * @type {Array<Identity>}
     * @memberof IdentityCollection
     */
    identities: Array<Identity>;
}

/**
 * Request to link an identity provider's audience and your app's audience with Authress.
 * @export
 * @interface IdentityRequest
 */
export interface IdentityRequest {
    /**
     * A valid JWT OIDC compliant token which will still pass authentication requests to the identity provider. Must contain a unique audience and issuer.
     * @type {string}
     * @memberof IdentityRequest
     */
    jwt: string;
    /**
     * If the `jwt` token contains more than one valid audience, then the single audience that should associated with Authress. If more than one audience is preferred, repeat this call with each one.
     * @type {string}
     * @memberof IdentityRequest
     */
    preferredAudience?: string;
}

/**
 * The collection of a list of clients
 * @export
 * @interface ServiceClientCollection
 */
export interface ServiceClientCollection extends IPaginated<ServiceClientCollection> {
    /**
     * A list of clients
     * @type {Array<ServiceClient>}
     * @memberof ServiceClientCollection
     */
    clients: Array<ServiceClientSummary>;
}
/**
 * A client configuration.
 * @export
 * @interface ServiceClientSummary
 */
export interface ServiceClientSummary {
  /**
   * The unique id of the client.
   * @type {string}
   * @memberof ServiceClientSummary
   */
  clientId: string;
  /**
   *
   * @type {Date}
   * @memberof ServiceClientSummary
   */
  createdTime?: Date;
  /**
   * The name of the client
   * @type {string}
   * @memberof ServiceClientSummary
   */
  name?: string;
}

/**
 * A client configuration.
 * @export
 * @interface ServiceClient
 */
export interface ServiceClient {
    /**
     * The unique id of the client. (ReadOnly)
     * @type {string}
     * @memberof ServiceClient
     */
    clientId?: string;
    /**
     * (ReadOnly)
     * @type {Date}
     * @memberof ServiceClient
     */
    createdTime?: Date;
    /**
     * The name of the client
     * @type {string}
     * @memberof ServiceClient
     */
    name?: string;
    /**
     *
     * @type {ServiceClientOptions}
     * @memberof ServiceClient
     */
    options?: ServiceClientOptions;

    /**
     * A list of the service client access keys.
     * @type {Array<ClientAccessKey>}
     * @memberof ServiceClient
     */
    verificationKeys?: Array<ClientAccessKey>;
}
/**
 * A client configuration.
 * @export
 * @interface AccessKeyResponse
 */
export interface AccessKeyResponse {
    /**
     * The unique id of the client.
     * @type {string}
     * @memberof AccessKeyResponse
     */
    keyId?: string;
    /**
     * The unique id of the client.
     * @type {string}
     * @memberof AccessKeyResponse
     */
    clientId: string;
    /**
     *
     * @type {Date}
     * @memberof AccessKeyResponse
     */
    generationDate?: Date;
    /**
     * An encoded access key which contains identifying information for client access token creation. For direct use with the Authress SDKs, not meant to be decoded. Must be saved on created, as it will never be returned from the API ever again. Authress only saved the corresponding public key to verify private access keys.
     * @type {string}
     * @memberof AccessKeyResponse
     */
    accessKey?: string;

    /**
     * The unencoded OAuth client secret used with the OAuth endpoints to request a JWT using the 'client_credentials' grant type. Pass the clientId and the clientSecret to the documented /tokens endpoint.
     * @type {string}
     * @memberof AccessKeyResponse
     */
    clientSecret?: string;
}

/**
 *
 * @export
 * @interface ResourcePermissionsCollection
 */
export interface ResourcePermissionsCollection {
  /**
   *
   * @type {Array<ResourcePermissionsObject>}
   * @memberof ResourcePermissionsCollection
   */
  permissions: Array<ResourcePermissionsObject>;
}

/**
 *
 * @export
 * @interface ResourceUsersCollection
 */
export interface ResourceUsersCollection extends IPaginated<ResourceUsersCollection> {
  /**
   *
   * @type {Array<UserRoleCollection>}
   * @memberof ResourceUsersCollection
   */
  users: Array<UserRoleCollection>;
}

/**
 * The role which contains a list of permissions.
 * @export
 * @interface Role
 */
export interface Role {
    /**
     * Unique identifier for the role, can be specified on creation, and used by records to map to permissions.
     * @type {string}
     * @memberof Role
     */
    roleId: string;
    /**
     * A helpful name for this role
     * @type {string}
     * @memberof Role
     */
    name: string;
    /**
     * A description for when to the user as well as additional information.
     * @type {string}
     * @memberof Role
     */
    description?: string;
    /**
     * A list of the permissions
     * @type {Array<PermissionObject>}
     * @memberof Role
     */
    permissions: Array<PermissionObject>;
}

/**
 * Metadata and additional properties relevant.
 * @export
 * @interface MetadataObject
 */
export interface MetadataObject {
    /**
     *
     * @type {AccountLink}
     * @memberof MetadataObject
     */
    account?: AccountLink;
    /**
     *
     * @type {string}
     * @memberof MetadataObject
     */
    userId: string;
    /**
     * A JSON object limited to 10KB. The owner identified by the sub will always have access to read and update this data. Service clients may have access if the related property on the client is set. Access is restricted to authorized users.
     * @type {Record<string, unknown>}
     * @memberof MetadataObject
     */
    metadata: Record<string, unknown>;
}

/**
 * A collect of permissions that the user has to a resource.
 * @export
 * @interface PermissionResponse
 */
export interface PermissionResponse {
    /**
     *
     * @type {AccountLink}
     * @memberof PermissionResponse
     */
    account?: AccountLink;
    /**
     *
     * @type {string}
     * @memberof PermissionResponse
     */
    userId: string;
    /**
     * A list of the permissions
     * @type {Array<PermissionObject>}
     * @memberof PermissionResponse
     */
    permissions: Array<PermissionObject>;
}
/**
 *
 * @export
 * @interface ResourcePermission
 */
export interface ResourcePermission {
    /**
     *
     * @type {Array<ResourcePermissionsObject>}
     * @memberof ResourcePermission
     */
    permissions: Array<ResourcePermissionsObject>;
}
/**
 * A collection of resource permissions that have been defined.
 * @export
 * @interface ResourcePermissionCollection
 */
export interface ResourcePermissionCollection extends IPaginated<ResourcePermissionCollection> {
    /**
     *
     * @type {Array<ResourcePermission>}
     * @memberof ResourcePermissionCollection
     */
    resources: Array<ResourcePermission>;
}

/**
 * A map of client specific options
 * @export
 * @interface ServiceClientOptions
 */
export interface ServiceClientOptions {
    /**
     * Grant the client access to verify authorization on behalf of any user.
     * @type {boolean}
     * @memberof ServiceClientOptions
     */
    grantUserPermissionsAccess?: boolean;
    /**
     * Grant the client access to read and write user data on behalf of any user
     * @type {boolean}
     * @memberof ServiceClientOptions
     */
    grantMetadataAccess?: boolean;
}

/**
 *
 * @export
 * @interface UserIdentity
 */
export interface UserIdentity {
  /**
   *
   * @type {string}
   * @memberof UserIdentity
   */
  userId: string;

  /**
   *
   * @type {string}
   * @memberof UserIdentity
   */
  picture?: string;

  /**
   *
   * @type {string}
   * @memberof UserIdentity
   */
  name?: string;

  /**
   *
   * @type {string}
   * @memberof UserIdentity
   */
  email?: string;
}

/**
 *
 * @export
 * @interface ResourcePermissionsObject
 */
export interface ResourcePermissionsObject {
  /**
   *
   * @type {string}
   * @memberof ResourcePermissionsObject
   */
  action: ResourcePermissionsObject.ActionEnum;
  /**
   *
   * @type {boolean}
   * @memberof ResourcePermissionsObject
   */
  allow: boolean;
}

/**
 * @export
 * @namespace ResourcePermissionsObject
 */
export namespace ResourcePermissionsObject {
  /**
   * @export
   * @enum {string}
   */
  export enum ActionEnum {
      CLAIM = 'CLAIM',
      PUBLIC = 'PUBLIC'
  }
}

/**
 * AccessRecordsApi
 * @export
 */
export interface AccessRecordsApi {
  /**
   * Claim a resource by allowing a user to pick an identifier and receive admin access to that resource if it hasn't already been claimed. This only works for resources specifically marked as <strong>CLAIM</strong>. The result will be a new access record listing that user as the admin for this resource. The resourceUri will be appended to the collection resource uri using a '/' (forward slash) automatically.
   * @summary Claim a resource by an allowed user
   * @param {ClaimRequest} body
   * @throws {ArgumentRequiredError}
   */
  createClaim(body: ClaimRequest): Promise<Response<void>>;
  /**
   * Specify user roles for specific resources.
   * @summary Create a new access record
   * @param {AccessRecord} body
   * @throws {ArgumentRequiredError}
   */
  createRecord(body: AccessRecord): Promise<Response<AccessRecord>>;
  /**
   * Remove an access record, removing associated permissions from all users in record. If a user has a permission from another record, that permission will not be removed. (Note: This disables the record by changing the status to <strong>DELETED</strong> but not completely remove the record for tracking purposes.
   * @summary Deletes an access record.
   * @param {string} recordId The identifier of the access record.
   * @throws {ArgumentRequiredError}
   */
  deleteRecord(recordId: string): Promise<Response<void>>;
  /**
   * Access records contain information assigning permissions to users for resources.
   * @summary Get an access record for the account.
   * @param {string} recordId The identifier of the access record.
   * @throws {ArgumentRequiredError}
   */
  getRecord(recordId: string): Promise<Response<AccessRecord>>;
  /**
   * <i class=\"far fa-money-bill-alt text-primary\"></i> <span class=\"text-primary\">Billable</span> Returns a paginated records list for the account. Only records the user has access to are returned.
   * @summary Get all account records.
   * @param {number} [limit] Max number of results to return
   * @param {Cursor} [cursor] Continuation cursor for paging (will automatically be set)
   * @param {string} [filter] Filter to search records by. This is a case insensitive search through every text field.
   * @param {string} [status] Filter records by their current status.
   * @throws {ArgumentRequiredError}
   */
  getRecords(limit?: number, cursor?: Cursor, filter?: string, status?: string): Promise<Response<AccessRecordCollection>>;
  /**
   * Updates an access record adding or removing user permissions to resources.
   * @summary Update an access record.
   * @param {string} recordId The identifier of the access record.
   * @param {AccessRecord} body
   * @param {Date|string} expectedLastModifiedTime The expected last time that the access record was updated. Provide this value using the {@link AccessRecord.lastUpdated} time to prevent overwriting previous updates.
   * @throws {ArgumentRequiredError}
   */
  updateRecord(recordId: string, body: AccessRecord, expectedLastModifiedTime?: Date): Promise<Response<AccessRecord>>;
}

/**
 * AccountsApi
 * @export
 */
export interface AccountsApi {
  /**
   * Includes the original configuration information.
   * @summary Get account information.
   * @param {string} accountId The unique identifier for the account
   * @throws {ArgumentRequiredError}
   */
  getAccount(accountId: string): Promise<Response<Account>>;
  /**
   * Returns a list of identities linked for this account.
   * @summary Get all linked identities for this account.
   * @throws {ArgumentRequiredError}
   */
  getAccountIdentities(): Promise<Response<IdentityCollection>>;
  /**
   * Returns a list of accounts that the user has access to.
   * @summary Get all accounts user has access to
   * @throws {ArgumentRequiredError}
   */
  getAccounts(): Promise<Response<AccountCollection>>;
  /**
   * An identity is a JWT subscriber *sub* and issuer *iss*. Only one account my be linked to a particular JWT combination. Allows calling the API with a federated token directly instead of using a client access key.
   * @summary Link a new account identity.
   * @param {IdentityRequest} body
   * @throws {ArgumentRequiredError}
   */
  linkIdentity(body: IdentityRequest): Promise<Response<void>>;
}

// /**
//  * MetadataApi
//  * @export
//  */
// export interface MetadataApi {
//   /**
//    * <i class=\"far fa-money-bill-alt text-primary\"></i> <span class=\"text-primary\">Billable</span> Metadata is partitioned by the resource owner, and each can store independent data for a resource. This data is only accessible by identity provider tokens which specify the <strong>sub</strong> property and by service clients which have the <strong>grantMetadataAccess</strong> property.
//    * @summary Get the metadata for a resource.
//    * @param {string} userId The owner of the data.
//    * @param {string} resourceUri The resource the data is attached to.
//    * @throws {ArgumentRequiredError}
//    */
//   getUserMetadata(userId: string, resourceUri: string): Promise<Response<MetadataObject>>;
//   /**
//    * <i class=\"far fa-money-bill-alt text-primary\"></i> <span class=\"text-primary\">Billable</span> Each owner can store independent data for a resource. This data is only accessible by identity provider tokens which specify the <strong>sub</strong> property and by service clients which have the <strong>grantMetadataAccess</strong> property. The underlying resource does not need to actually exist in Authress to manage and update the data.
//    * @summary Update the metadata for a resource.
//    * @param {string} userId The owner of the data.
//    * @param {string} resourceUri The resource the data is attached to.
//    * @param {MetadataObject} body &lt;strong&gt;Important&lt;/strong&gt;: Data request object which contains properties identifying the data as well as the metadata itself. While there is limited access, the data saved here should be considered encrypted with best practices (Encrypted in Transit and Encrypted at Rest only). However, while Authress will to store and access in the data in a safe way, usage of this endpoint affirms this data must be application data and not user data. If there are explicit regulations or compliances regarding the data and how it should be saved here, this endpoint must not be used. That includes, but is not limited to--user personal data, data that is protected by GDPR and similar data protection regulations.
//    * @throws {ArgumentRequiredError}
//    */
//   updateUserMetadata(userId: string, resourceUri: string, body: MetadataObject): Promise<Response<MetadataObject>>;
// };

/**
 * ResourcesApi
 * @export
 */
export interface ResourcesApi {
  /**
   * Permissions can be set globally at a resource level. This will apply to all users in an account.
   * @summary Get a resource permissions object.
   * @param {string} resourceUri The uri path of a resource to validate, must be URL encoded, uri segments are allowed.
   * @throws {ArgumentRequiredError}
   */
  getResourcePermissions(resourceUri: string): Promise<Response<ResourcePermissionsCollection>>;
  /**
   * <i class=\"far fa-money-bill-alt text-primary\"></i> <span class=\"text-primary\">Billable</span> Get the resource users. This result is a list of users that have some permission to the resource. Users with access to higher level resources nor users with access only to a sub-resource, will not be returned in this result. In the case that the resource has multiple users, the list will be paginated.
   * @summary List resource users
   * @param {string} resourceUri The uri path of a resource to validate, must be URL encoded, uri segments are allowed.
   * @throws {ArgumentRequiredError}
   */
  getResourceUsers(resourceUri: string): Promise<Response<ResourceUsersCollection>>;

  /**
   * Permissions can be set globally at a resource level. Lists any resources with a globally set resource policy
   * @summary List resource configurations
   * @throws {ArgumentRequiredError}
   */
  getResources(): Promise<Response<ResourcePermissionCollection>>;
  /**
   * Updates the global permissions on a resource. This applies to all users in an account.
   * @summary Update a resource permissions object.
   * @param {string} resourceUri The uri path of a resource to validate, must be URL encoded, uri segments are allowed.
   * @param {ResourcePermissionsObject} body The contents of the permission to set on the resource. Overwrites existing data.
   * @throws {ArgumentRequiredError}
   */
  updateResourcePermissions(resourceUri: string, body: ResourcePermissionsObject): Promise<Response<void>>;
}

/**
 * RolesApi
 * @export
 */
export interface RolesApi {
  /**
   * Remove a role. If a record references the role, that record will not be modified.
   * @summary Deletes a role.
   * @param {string} roleId The identifier of the role.
   * @throws {ArgumentRequiredError}
   */
  deleteRole(roleId: string): Promise<Response<void>>;
  /**
   * Roles contain a list of permissions that will be applied to any user or resource
   * @summary Get a role.
   * @param {string} roleId The identifier of the role.
   * @throws {ArgumentRequiredError}
   */
  getRole(roleId: string): Promise<Response<Role>>;
  /**
   * Updates a role adding or removing permissions.
   * @summary Update a role.
   * @param {string} roleId The identifier of the role.
   * @param {Role} body
   * @throws {ArgumentRequiredError}
   */
  updateRole(roleId: string, body: Role): Promise<Response<Role>>;
  /**
   * Creates a role and add permissions.
   * @summary Create a new role.
   * @param {Role} body
   * @throws {ArgumentRequiredError}
   */
  createRole(body: Role): Promise<Response<Role>>;
}

/**
 * ServiceClientsApi
 * @export
 */
export interface ServiceClientsApi {
  /**
   * Creates a service client to interact with Authress or any other service on behalf of users. Each client has secret private keys used to authenticate with Authress. To use service clients created through other mechanisms, skip creating a client and create access records with the client identifier.
   * @summary Create a new client.
   * @param {ServiceClient} body
   * @throws {ArgumentRequiredError}
   */
  createClient(body: ServiceClient): Promise<Response<ServiceClient>>;
  /**
   * Deletes an access key for a client prevent it from being used to authenticate with Authress.
   * @summary Remove an access key for a client
   * @param {string} clientId The unique identifier of the client.
   * @param {string} keyId The id of the access key to remove from the client.
   * @throws {ArgumentRequiredError}
   */
  deleteAccessKey(clientId: string, keyId: string): Promise<Response<void>>;
  /**
   * This deletes the service client.
   * @summary Delete a client
   * @param {string} clientId The unique identifier for the client.
   * @throws {ArgumentRequiredError}
   */
  deleteClient(clientId: string): Promise<Response<void>>;
  /**
   * Returns all information related to client except for the private access keys.
   * @summary Get a client.
   * @param {string} clientId The unique identifier for the client.
   * @throws {ArgumentRequiredError}
   */
  getClient(clientId: string): Promise<Response<ServiceClient>>;
  /**
   * Returns all clients that the user has access to in the account.
   * @summary Get clients collection
   * @throws {ArgumentRequiredError}
   */
  getClients(): Promise<Response<ServiceClientCollection>>;
  /**
   * Create a new access key for the client so that a service can authenticate with Authress as that client. Using the client will allow delegation of permission checking of users.
   * @summary Request a new access key
   * @param {string} clientId The unique identifier of the client.
   * @throws {ArgumentRequiredError}
   */
  requestAccessKey(clientId: string): Promise<Response<AccessKeyResponse>>;
  /**
   * Updates a client information.
   * @summary Update a client
   * @param {string} clientId The unique identifier for the client.
   * @param {ServiceClient} body
   * @throws {ArgumentRequiredError}
   */
  updateClient(clientId: string, body: ServiceClient): Promise<Response<ServiceClient>>;
}

/**
 * UsersApi
 * @export
 */
export interface UsersApi {
  /**
   * Get an Authress user
   * @summary Retrieve a user with user data.
   * @param {string} [userId] The user te get.
   * @throws {ArgumentRequiredError}
   */
  getUser(userId: string): Promise<Response<UserIdentity>>;
}

/**
 * AuthressClient
 * @export
 * @summary Creates an instance of the authress client with properties for each of the APIs
 */
export class AuthressClient {
  /**
   * @constructor
   * @summary Creates an instance of the Authress client.
   * @param {AuthressSettings} settings The authress settings
   * @param {Promise<Function<string>> | Function<string> | string} [accessKey] The Service Client SDK Access Key.
   */
  constructor(settings: AuthressSettings, accessKey?: string);

  /**
   * @constructor
   * @summary Creates an instance of the Authress client.
   * @param {AuthressSettings} settings The authress settings
   * @param {Promise<Function<string>> | Function<string> | string} [tokenProvider] A {@link ServiceClientTokenProvider} which can generate an Authress client with the service clients permissions.
   */
  constructor(settings: AuthressSettings, tokenProvider?: (() => Promise<string>) | (() => string) | ServiceClientTokenProvider);

  /**
   * @summary The AccessRecords api
   * @type {AccessRecordsApi}
   */
  accessRecords: AccessRecordsApi;

  /**
   * @summary The Invites api
   * @type {InvitesApi}
   */
  invites: InvitesApi;

  /**
   * @summary The ServiceClients api
   * @type {ServiceClientsApi}
   */
  serviceClients: ServiceClientsApi;

  /**
   * @summary The UserPermissions api
   * @type {UserPermissionsApi}
   */
  userPermissions: UserPermissionsApi;

  /**
   * @summary The Users api
   * @type {UsersApi}
   */
  users: UsersApi;

  /**
   * @summary The Resources api
   * @type {ResourcesApi}
   */
  resources: ResourcesApi;

  /**
   * @summary The Accounts api
   * @type {AccountsApi}
   */
  accounts: AccountsApi;

  /**
   * @summary The Roles api
   * @type {RolesApi}
   */
  roles: RolesApi;

  /**
   * @summary The Connections api
   * @type {ConnectionsApi}
   */
  connections: ConnectionsApi;

  /**
   * @summary The Extensions api
   * @type {ExtensionsApi}
   */
  extensions: ExtensionsApi;

  /**
   * @summary The Tenants api
   * @type {TenantsApi}
   */
  tenants: TenantsApi;

  /**
   * @summary Verify an incoming Authress JWT request access token here.
   * @type {Function<Promise<Record<string, unknown>>>}
   * @param {string} jwtToken The user's JWT access token.
   * @returns {Promise<Record<string, unknown>>} The user's verified identity.
   * @throws {TokenVerificationError}
   */
  verifyToken(jwtToken: string): Promise<Record<string, unknown>>;
}

/**
 * ServiceClientTokenProvider getToken options.
 * @export
 * @interface GetTokenOptions
 */
export interface GetTokenOptions {
  /** Override the generated token properties.
   * @type {JwtOverrides}
   * @memberof GetTokenOptions
  */
  jwtOverrides?: JwtOverrides;
}

/**
 * Override default JWT claims and properties.
 * @export
 * @interface JwtOverrides
 */
export interface JwtOverrides {
  /** Specify Header custom properties to be used in conjunction with the ones generated by the library.
   * @type {Record<string, unknown>}
   * @memberof JwtOverrides
  */
  header?: Record<string, unknown>;

  /** Specify JWT payload custom claims and properties to be used in conjunction with the ones generated by the library.
   * @type {Record<string, unknown>}
   * @memberof JwtOverrides
  */
  payload?: Record<string, unknown>;
}

/**
 * ServiceClientTokenProvider
 * @export
 * @summary Request a user token with additional configuration
*/
export class ServiceClientTokenProvider {
  /**
   * @constructor
   * @summary Create an instance of the service client token provider. Used to call the Authress API, when the user's token does not contain the necessary permissions.
   * @param {string} accessKey The service client access key, can be generated from https://authress.io/app/#/manage?focus=clients
   * @param {string} [authressCustomDomain] The custom domain specified in your account under domain settings. What should my url be? => https://authress.io/app/#/setup?focus=domain
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(accessKey: string, authressCustomDomain?: string);

  /**
   * @summary Generate a token from this token provider. This is used indirectly by the SDK itself to generate tokens to authorize requests to Authress. It can also be used to generate tokens to authenticate to other services in your platform.
   * @type {Function<Promise<string>>}
   * @param {GetTokenOptions} options Configure the token creation properties such as overriding the properties and claims of the generated JWT with custom ones.
   * @returns {Promise<string>} Generates a token to be used.
   */
  getToken(options?: GetTokenOptions): Promise<string>;

  /**
   * Generate the url to redirect the user back to your application from your authentication server after their credentials have been successfully verified. All these parameters should be found passed through from the user's login attempt along with their credentials. The authentication server receives a request from the user to login, with these values. Then these are constructed and sent back to Authress to verify the generated login data.
   * @summary Generate the url to redirect the user back to your application from your authentication server after their credentials have been successfully verified.
   * @type {Function<Promise<string>>}
   * @param {string} authressCustomDomainLoginUrl The url sent with the request for the user to login, this should match the Authress custom domain: https://authress.io/app/#/setup?focus=domain and end in /login for example https://login.domain.com/login. This value is sent as the `redirect_uri` query string parameter in the request and should be passed directly into the SDK for simplicity. Avoid trying to manually construct this url.
   * @param {string} state The state parameter sent to the authentication server.
   * @param {string} clientId The clientId parameter sent to the authentication server. This will be validated against the client's credentials specified in the {@link ServiceClientTokenProvider}
   * @param {string} userId The user to request a JWT for.
   * @returns {Promise<string>} A url to redirect the user to complete login.
   */
  generateUserLoginUrl(authressCustomDomainLoginUrl: string, state: string, clientId: string, userId: string): Promise<string>;

  /**
   * Generate the url to redirect the user back to your application from your authentication server after their credentials have been successfully verified. All these parameters should be found passed through from the user's login attempt along with their credentials. The authentication server receives a request from the user to login, with these values. Then these are constructed and sent back to Authress to verify the generated login data.
   * @summary Generate the url to redirect the user back to your application from your authentication server after their credentials have been successfully verified.
   * @type {Function<Promise<string>>}
   * @param {AuthenticateResponse} authenticateResponse The response object returned from the {@link @authress/login} SDK, it contains all the necessary information into order to correctly authenticate a user.
   * @param {string} userId The user to request a JWT for.
   * @returns {Promise<string>} A url to redirect the user to complete login.
   */
  generateUserLoginUrl(authenticateResponse: AuthenticateResponse, userId: string): Promise<string>;
}

/**
 * TokenVerifier
 * @export
 * @summary Verify a JWT that has been generated by the Authress Login API
 * @param {string} authressCustomDomain The custom domain specified in your account under domain settings. What should my url be? => https://authress.io/app/#/setup?focus=domain
 * @param {string} authenticationToken The token to be verified
 * @returns {Promise<Record<string, unknown>>} The user's verified identity.
*/
export function TokenVerifier(authressCustomDomain: string, authenticationToken: string): Promise<Record<string, unknown>>;

/**
 * ArgumentRequiredError
 * @export
 * @summary An error thrown when a required parameter for the API has not been specified
*/
export class ArgumentRequiredError extends Error {}
/**
 * UnauthorizedError
 * @export
 * @summary Thrown when the user does not have permissions to the resource
*/
export class UnauthorizedError extends Error {
  userId: string;
  resourceUri: string;
  permission: string;
}

/**
 * ApiError
 * @export
 * @summary Thrown when the api request fails expectedly with 4XX, may also be thrown as a 5XX
*/
export class ApiError extends Error {
  status: number;
  body: string;
  headers: string;
}

/**
 * TokenVerificationError
 * @export
 * @summary Thrown when the user access token is invalid.
*/
export class TokenVerificationError extends Error {}
