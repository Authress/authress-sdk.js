 
import { IPaginated } from '../response';
import { User } from '../records/dtos';

/**
 * A group of users, which can be added to access records.
 * @export
 * @interface Group
 */
export interface Group {
  /**
   * Unique identifier for the groupId, can be specified on record creation. Must begin with grp_.
   * @type {string}
   * @memberof Group
   */
  groupId?: string;
  /**
   * A helpful name for this record
   * @type {string}
   * @memberof Group
   */
  name: string;
  /**
   * The expected last time the group was updated
   * @type {string}
   * @memberof Group
   */
  lastUpdated?: string;
  /**
   * The list of users in this group. A group can have a maximum of 100 users.
   * @type {Array<User>}
   * @memberof Group
   */
  users: Array<User>;
  /**
   * The list of admins that can edit this record even if they do not have global record edit permissions.
   * @type {Array<User>}
   * @memberof Group
   */
  admins: Array<User>;
}
/**
* A collection of groups.
* @export
* @interface GroupCollection
*/
export interface GroupCollection extends IPaginated<GroupCollection> {
  /**
   *
   * @type {Array<Group>}
   * @memberof GroupCollection
   */
  groups: Array<Group>;
}
