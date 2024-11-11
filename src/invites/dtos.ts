/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line node/no-missing-import
import { Resource } from '../records/dtos';

/**
 * The user invite used to invite users to your application or to Authress as an admin.
 * @export
 * @interface Invite
 */
export interface Invite {
  /**
   * The unique identifier for the invite. Use this ID to accept the invite. This parameter is ignored during invite creation.
   * @type {string}
   * @memberof Invite
   */
  inviteId?: string;
  /**
   * Specify the tenant associated with the invite. The invited user must use this tenant's connection configuration to log in.
   * @type {string}
   * @memberof Invite
   */
  defaultLoginTenantId?: string;
  /**
   * Provided by Authress as a unique URI that can be used to start the Authress Login flow for the user. Provide this property in the `request_uri` property, when not using the Authress Login UI SDK. This parameter is ignored during invite creation.
   * @type {string}
   * @memberof Invite
   */
  authenticationRequestUri?: string;
  /**
   * A list of statements which match roles to resources. The invited user will all statements apply to them when the invite is accepted.
   * @type {Array<InviteStatement>}
   * @memberof Invite
   */
  statements?: Array<InviteStatement>;
}

/**
 *
 * @export
 * @interface InviteStatement
 */
export interface InviteStatement {
  /**
   *
   * @type {Array<string>}
   * @memberof InviteStatement
   */
  roles: Array<string>;
  /**
   *
   * @type {Array<Resource>}
   * @memberof InviteStatement
   */
  resources: Array<Resource>;
}
