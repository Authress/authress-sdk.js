/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line node/no-missing-import
import { Resource } from '../records/dtos';

export namespace Invite {
  /**
   * @export
   * @enum {string}
   */
  export enum ConflictResolutionStrategyEnum {
    /** (Default) Create a new access record which matches the statements in this invite. The record ID will be randomly generated and is unpredictable. */  
    GENERATE_NEW_RECORD = 'GENERATE_NEW_RECORD',
    /** Add the user and statements to the existing record. This will cause the user to gain all the permissions already defined in that record and will cause all the users currently in that record to gain all the additional permissions defined in the invite. */
    UNSAFE_FORCE_MERGE = 'UNSAFE_FORCE_MERGE',
    /** Replace the existing access record users, roles, and resources with those specified in this invite. */
    REPLACE_RECORD_DATA = 'REPLACE_RECORD_DATA',
    /** Do not replace, do not create, do not throw. Optimal for ensuring that all records have a known management strategy and successful invite acceptance is more important than the granted permissions. */
    SKIP_CHANGES = 'SKIP_CHANGES'
  }
}

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
   * Specify a User ID the user should receive when login completes. This ID is used to automatically assign a user ID to the user rather than a dynamically generated Authress User ID when using the Authress Login UI SDK. This parameter is ignored when accepting invites directly. Note: If the user logging in has already signed up, then this parameter is ignored. (Max length: 32, allowed characters: [a-zA-Z0-9_-])
   * @type {string}
   * @memberof Invite
   */
  linkedUserId?: string;

  /**
   * Specify the tenant associated with the invite. This tenant Id is used to automatically select the tenant during login with Authress when using the Authress Login UI SDK. This parameter is ignored when accepting invites directly. To explicitly add a user to a tenant use the <code>linkTenantUser</code> API endpoint.
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

  /**
   * An access record will be created when the invite is accepted. If the access record already exists, and the statements in this invite can be merged safely, then the existing record will be updated. A safe merge is one in which the current user will only gain additional access to the statements defined in the invite and other users will not gain additional access in any scenario. When this cannot be done safely, Authress will fallback to this parameter. [default: GENERATE_NEW_RECORD]
   * @type {Invite.ConflictResolutionStrategyEnum}
   * @memberof Invite
   */
  conflictResolutionStrategy?: Invite.ConflictResolutionStrategyEnum;

  /**
   * When should the invite expire? Creating invites that are available for longer than 7 days may be a security risk as invites can be used to regain access even after a user has lost access. This is the fundamental aspect of invites, because invites exist to grant access to a user that does not currently have access. The minimum is five minutes and the max is 30 days. This value must conform to the ISO8601 format. Note: Explicitly setting this parameter to a value other than the default requires the permission: Invites:Create Authress:Invites.
   * @type {string}
   * @memberof Invite
   */
  expires?: string;
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
