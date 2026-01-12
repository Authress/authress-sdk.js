/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */

/**
 *
 * @export
 * @interface Resource
 */
export interface Resource {
  /**
   * A resource path which can be top level, fully qualified, or end with a *. Parent resources imply permissions to sub-resources.
   * @type {string}
   * @memberof Resource
   */
  resourceUri: string;
}

/**
 *
 * @export
 * @interface Statement
 */
export interface Statement {
  /**
   *
   * @type {Array<string>}
   * @memberof Statement
   */
  roles: Array<string>;
  /**
   *
   * @type {Array<Resource>}
   * @memberof Statement
   */
  resources: Array<Resource>;
  /**
   * The list of users this statement applies to
   * @type {Array<User>}
   * @memberof AccessRecord
   */
   users?: Array<User>;
   /**
   * The list of groups this statement applies to. Users in these groups will be receive access to the resources listed.
   * @type {Array<LinkedGroup>}
   * @memberof AccessRecord
   */
   groups?: Array<LinkedGroup>;
}

/**
 *
 * @export
 * @interface LinkedGroup
 */
export interface LinkedGroup {
  /**
   * @type {string}
   * @memberof LinkedGroup
   */
  groupId: string;
}

/**
 *
 * @export
 * @interface User
 */
export interface User {
  /**
   *
   * @type {string}
   * @memberof User
   */
  userId: string;
}
