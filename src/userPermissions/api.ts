/* eslint-disable node/no-missing-import */
import { Response, Cursor } from '../response';
import { UserPermissions, UserResources, UserToken, UserRoleCollection, GetUserResourcesParams } from './dtos';

/**
 * UserPermissionsApi
 * @export
 */
export interface UserPermissionsApi {
  /**
   * <i class=\"far fa-money-bill-alt text-primary\"></i> <span class=\"text-primary\">Billable</span> Does the user have the specified permissions to the resource?
   * @summary Check to see if a user has permissions to a resource.
   * @param {string} [userId] The user to check permissions on
   * @param {string} resourceUri The uri path of a resource to validate, must be URL encoded, uri segments are allowed, the resource must be a full path, and permissions are not inherited by sub-resources.
   * @param {string} permission Permission to check, &#x27;*&#x27; and scoped permissions can also be checked here.
   * @throws {ArgumentRequiredError}
   * @throws {UnauthorizedError}
   */
  // @ts-ignore
  authorizeUser(userId?: string | null, resourceUri: string, permission: string): Promise<Response<void>>;
  /**
   * <i class=\"far fa-money-bill-alt text-primary\"></i> <span class=\"text-primary\">Billable</span> Permanently disable a token. To be used after the token has completed its use. Should be called on all tokens to ensure they are not active indefinitely.
   * @summary Disable a token
   * @param {string} [userId] The user to create an impersonation token for.
   * @param {string} tokenId The relevant token identifier
   * @throws {ArgumentRequiredError}
   */
  // @ts-ignore
  disableUserToken(userId?: string | null, tokenId: string): Promise<Response<void>>;
  /**
   * <i class=\"far fa-money-bill-alt text-primary\"></i> <span class=\"text-primary\">Billable</span> Get a summary of the permissions a user has to a particular resource.
   * @summary Get the permissions a user has to a resource.
   * @param {string} [userId] The user to check permissions on
   * @param {string} resourceUri The uri path of a resource to validate, must be URL encoded, uri segments are allowed.
   * @throws {ArgumentRequiredError}
   */
  // @ts-ignore
  getUserPermissionsForResource(userId?: string | null, resourceUri: string): Promise<Response<UserPermissions>>;
  /**
   * <i class="far fa-money-bill-alt text-primary"></i> <span class="text-primary">Billable</span> Get a summary of the roles a user has to a particular resource. Users can be assigned roles from multiple access records, this may cause the same role to appear in the list more than once.<br><span class="badge badge-outline-secondary">READ: Authress:UserPermissions/{userId}</span>
   * @summary Get the roles a user has to a resource.
   * @param {string} [userId] The user to get roles for.
   * @param {string} resourceUri The uri path of a resource to get roles for, must be URL encoded. Checks for explicit resource roles, roles attached to parent resources are not returned.
   * @throws {ArgumentRequiredError}
   */
  // @ts-ignore
   getUserRolesForResource(userId?: string | null, resourceUri: string): Promise<Response<UserRoleCollection>>;
  /**
   * <i class=\"far fa-money-bill-alt text-primary\"></i> <span class=\"text-primary\">Billable</span> Get the users resources. Get the users resources. This result is a list of resource uris that a user has an explicit permission to, a user with * access to all sub resources will return an empty list and {accessToAllSubResources} will be populated. To get a user's list of resources in these cases, it is recommended to also check explicit access to the collection resource, using the authorizeUser endpoint. In the case that the user only has access to a subset of resources in a collection, the list will be paginated.
   * @summary Get the resources a user has to permission to.
   * @param {string} [userId] The user to check permissions on
   * @param {string} [resourceUri] The top level uri path of a resource to query for. Will only match explicit or collection resource sub-resources. Will not partial match resource names.
   * @param {number} [limit] Max number of results to return
   * @param {Cursor} [cursor] Continuation cursor for paging (will automatically be set)
   * @param {string} [permission] A required ALLOW action to check for. Resources a user does not have this permission will not be returned.
   * @param {string} [collectionConfiguration] TOP_LEVEL_ONLY - returns only directly nested resources under the resourceUri. A query to resourceUri=Collection will return Collection/resource_1.
INCLUDE_NESTED - will return all sub-resources as well as deeply nested resources that the user has the specified permission to. A query to resourceUri=Collection will return Collection/namespaces/ns/resources/resource_1. To return matching resources for nested resources, set this parameter to INCLUDE_NESTED.
   * @throws {ArgumentRequiredError}
   */
  getUserResources(userId?: string | null, resourceUri?: string, limit?: number, cursor?: Cursor, permission?: string, collectionConfiguration?: GetUserResourcesParams.CollectionConfiguration):
    Promise<Response<UserResources>>;
