/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line node/no-missing-import
import { IPaginated, AccountLink } from '../response';

/**
 * The collective action and associate grants on a permission
 * @export
 * @interface PermissionObject
 */
export interface PermissionObject {
  /**
   * The action the permission grants, can be scoped using `:` and parent actions imply sub-action permissions, action:* or action implies action:sub-action. This property is case-insensitive, it will always be cast to lowercase before comparing actions to user permissions.
   * @type {string}
   * @memberof PermissionObject
   */
  action: string;
  /**
   * Does this permission grant the user the ability to execute the action?
   * @type {boolean}
   * @memberof PermissionObject
   */
  allow: boolean;
  /**
   * Allows the user to give the permission to others without being able to execute the action.
   * @type {boolean}
   * @memberof PermissionObject
   */
  grant: boolean;
  /**
   * Allows delegating or granting the permission to others without being able to execute tha action.
   * @type {boolean}
   * @memberof PermissionObject
   */
  delegate: boolean;
}

/**
 * A collect of permissions that the user has to a resource.
 * @export
 * @interface UserPermissions
 */
export interface UserPermissions {
  /**
   *
   * @type {AccountLink}
   * @memberof UserPermissions
   */
  account?: AccountLink;
  /**
   *
   * @type {string}
   * @memberof UserPermissions
   */
  userId: string;
  /**
   * A list of the permissions
   * @type {Array<PermissionObject>}
   * @memberof UserPermissions
   */
  permissions: Array<PermissionObject>;
}

/**
 *
 * @export
 * @interface UserRole
 */
export interface UserRole {
  /**
   * The identifier of the role.
   * @type {string}
   * @memberof UserRole
   */
  roleId: string;
}

/**
 *
 * @export
 * @interface UserRoleCollection
 */
export interface UserRoleCollection {
  /**
   * @type {string}
   * @memberof UserRoleCollection
   */
  userId: string;
  /**
   * A list of the attached user roles
   * @type {Array<UserRole>}
   * @memberof UserRoleCollection
   */
  roles: Array<UserRole>;
}

/**
 * A collect of permissions that the user has to a resource.
 * @export
 * @interface UserResources
 */
export interface UserResources extends IPaginated<UserResources> {
  /**
   *
   * @type {AccountLink}
   * @memberof UserResources
   */
  account?: AccountLink;
  /**
   *
   * @type {string}
   * @memberof UserResources
   */
  userId: string;
  /**
   * A list of the resources the user has some permission to.
   * @type {Array<UserResourcesResources>}
   * @memberof UserResources
   */
  resources?: Array<UserResourcesResources>;
}

/**
 *
 * @export
 * @interface UserResourcesResources
 */
export interface UserResourcesResources {
  /**
   * The resourceUri that matches the requested resourceUri that the user has access to.
   * @type {string}
   * @memberof UserResourcesResources
   */
  resourceUri: string;
}

/**
 * @export
 * @namespace GetUserResourcesParams
 */
export namespace GetUserResourcesParams {
  /**
   * @export
   * @enum {string}
   */
  export enum CollectionConfiguration {
    TOP_LEVEL_ONLY = 'TOP_LEVEL_ONLY',
    INCLUDE_NESTED = 'INCLUDE_NESTED'
  }
}
