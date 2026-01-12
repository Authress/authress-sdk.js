/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */

/**
 * @export
 * @interface UpdateAuthenticationRequestParameters
 */
export interface UpdateAuthenticationRequestParameters {
  /** Specify which provider connection that user would like to use to log in - see https://authress.io/app/#/manage?focus=connections */
  connectionId?: string;
  /** Instead of connectionId, specify the tenant lookup identifier to log the user with the mapped tenant - see https://authress.io/app/#/manage?focus=tenants */
  tenantLookupIdentifier?: string;
  /** Instead of connectionId or tenant lookup identifier, specify the user's domain or the full email for the user to dynamically identify and log the user with the mapped tenant. */
  hint?: string;
  /** Invite to use to login, only one of the connectionId, tenantLookupIdentifier, or the inviteId is required. */
  inviteId?: string;
  /** Overrides the connection specific properties from the Authress Identity Connection to pass to the identity provider */
  connectionProperties?: Record<string, string>;
}

/**
 * @export
 * @interface AuthenticationRequest
 */
export interface AuthenticationRequest {
  /** The recommended next url for the user to navigate to complete the authentication and log in successfully. */
  authenticationUrl: string;
}
