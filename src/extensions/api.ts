/* eslint-disable node/no-missing-import */
import { Response } from '../response';
import { Extension, ExtensionCollection } from './dtos';

/**
 * ExtensionsApi
 * @export
 */
export interface ExtensionsApi {
  /**
   * Specify identity extension details for Authress identity aggregation.
   * @summary Create SSO extension
   * @param {Extension} body
   * @throws {RequiredError}
   */
  createExtension(body: Extension): Promise<Response<Extension>>;

  /**
   * Delete an identity extension details for Authress identity aggregation.
   * @summary Delete SSO extension
   * @param {string} extensionId The extension identifier.
   * @throws {RequiredError}
   */
  deleteExtension(extensionId: string): Promise<Response<void>>;

  /**
  * Specify identity extension details for Authress identity aggregation.
  * @summary Update SSO extension
  * @param {Extension} body
  * @param {string} extensionId The extension identifier.
  * @throws {RequiredError}
  */
  updateExtension(extensionId: string, body: Extension): Promise<Response<Extension>>;

  /**
   * Get the identity extension details for Authress identity aggregation.
   * @summary Retrieve SSO extension
   * @param {string} extensionId The extension identifier.
   * @throws {RequiredError}
   */
  getExtension(extensionId: string): Promise<Response<Extension>>;

  /**
   * Returns a paginated extension list for the account. Only extensions the user has access to are returned.
   * @summary List SSO extensions
   * @throws {RequiredError}
   */
  getExtensions(): Promise<Response<ExtensionCollection>>;
}
