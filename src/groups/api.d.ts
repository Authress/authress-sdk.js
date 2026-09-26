 
import { Response } from '../response';
import { Group, GroupCollection } from './dtos';

/**
 * GroupsApi
 * @export
 */
export interface GroupsApi {
  /**
   * Specify users to be included in a new group. (Groups have a maximum size of 100 users)
   * @summary Create group
   * @param {Group} body
   * @throws {ArgumentRequiredError}
   */
  createGroup(body: Omit<Group, 'lastUpdated'>): Promise<Response<Group>>;

  /**
   * Remove a group, users will lose any role that was assigned through membership of this group. This action cannot be undone.
   * @summary Delete group
   * @param {string} groupId The identifier of the group.
   * @throws {ArgumentRequiredError}
   */
  deleteGroup(groupId: string): Promise<Response<void>>;

  /**
  * Updates a group adding or removing user. Change a group updates the permissions and roles the users have access to. (Groups have a maximum size of ~100KB)
  * @summary Update a group
  * @param {string} groupId The identifier of the group.
  * @param {Group} body
  * @param {Date} expectedLastModifiedTime The expected last time that the group was updated. Provide this value using the {@link Group.lastUpdated} time to prevent overwriting previous updates.
  * @throws {ArgumentRequiredError}
  */
  updateGroup(groupId: string, body: Omit<Group, 'lastUpdated'>, expectedLastModifiedTime?: Date): Promise<Response<Group>>;

  /**
   * A group contains multiple users which can be added to an access record, and should be assigned the same roles at the same time.
   * @summary Retrieve group
   * @param {string} groupId The identifier of the group.
   * @throws {ArgumentRequiredError}
   */
  getGroup(groupId: string): Promise<Response<Group>>;

  /**
   * Returns a paginated groups list for the account. Only groups the user has access to are returned.
   * @summary List groups
   * @param {number} [limit] Max number of results to return.
   * @param {string} [cursor] Continuation cursor for paging.
   * @param {string} [filter] Filter to search groups by.
   * @throws {ArgumentRequiredError}
   */
  getGroups(limit?: number, cursor?: string, filter?: string): Promise<Response<GroupCollection>>;
}
