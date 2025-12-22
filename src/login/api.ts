/* eslint-disable node/no-missing-import */
import { Response } from '../response';
import { UpdateAuthenticationRequestParameters, AuthenticationRequest } from './dtos';

/**
 * LoginApi
 * @export
 */
export interface LoginApi {
  /**
  * Patch an authentication request and update the properties. Use this to add in a connection ID, tenant ID, or other parameters so the user can complete their authentication and log in. This method should always and only be called from your custom self-hosted login screen: https://authress.io/app/#/settings?focus=branding
  * @summary Update Authentication Request
  * @param {string} authenticationRequestId The ID of the authentication request. When redirected from the Authress authenticate() call, this value is found in the `state` parameter of the url.
  * @param {string} selfHostedLoginApplicationUrl The application url for the self hosted login screen specified in the advanced options: https://authress.io/app/#/settings?focus=branding. If you are not using a self hosted login screen then this method should not be called.
  * @param {UpdateAuthenticationRequestParameters} authenticationRequest The properties of the authentication request to updated.
  * @throws {ArgumentRequiredError}
  */
  updateAuthenticationRequest(authenticationRequestId: string, selfHostedLoginApplicationUrl: string, authenticationRequest: UpdateAuthenticationRequestParameters):
    Promise<Response<AuthenticationRequest>>;
}
