/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line node/no-missing-import
import { Statement } from '../records/dtos';

/**
 * The user invite used to invite users to your application or to Authress as an admin.
 * @export
 * @interface Invite
 */
export interface Invite {
  /**
   * The unique identifier for the invite. Use this ID to accept the invite.
   * @type {string}
   * @memberof Invite
   */
  inviteId?: string;
  /**
   * Specify the tenant associated with the invite. The invited user must use this tenant's connection configuration to log in.
   * @type {string}
   * @memberof Invite
   */
  tenantId?: boolean;
  /**
   * A list of statements which match roles to resources. The invited user will all statements apply to them
   * @type {Array<Statement>}
   * @memberof Invite
   */
  statements: Array<Statement>;
}

