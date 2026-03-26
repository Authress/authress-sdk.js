 
import { Response } from '../response';
import { Connection, UserConnectionCredentials, ConnectionCollection } from './dtos';

/**
 * ConnectionsApi
 * @export
 */
export interface ConnectionsApi {
  /**
   * Specify identity connection details for Authress identity aggregation.
   * @summary Create SSO connection
   * @param {Connection} body
   * @throws {ArgumentRequiredError}
   */
  createConnection(body: Connection): Promise<Response<Connection>>;

  /**
   * Delete an identity connection details for Authress identity aggregation.
   * @summary Delete SSO connection
   * @param {string} connectionId The connection identifier.
   * @throws {ArgumentRequiredError}
   */
  deleteConnection(connectionId: string): Promise<Response<void>>;

  /**
  * Specify identity connection details for Authress identity aggregation.
  * @summary Update SSO connection
  * @param {Connection} body
  * @param {string} connectionId The connection identifier.
  * @throws {ArgumentRequiredError}
  */
  updateConnection(connectionId: string, body: Connection): Promise<Response<Connection>>;

  /**
   * Get the identity connection details for Authress identity aggregation.
   * @summary Retrieve SSO connection
   * @param {string} connectionId The connection identifier.
   * @throws {ArgumentRequiredError}
   */
  getConnection(connectionId: string): Promise<Response<Connection>>;

  /**
   * Returns a paginated connection list for the account. Only connections the user has access to are returned.
   * @summary List SSO connections
   * @throws {ArgumentRequiredError}
   */
  getConnections(): Promise<Response<ConnectionCollection>>;

  /**
   * Get the credentials for the user that were generated as part of the latest user login flow. Returns an access token that can be used with originating connection provider, based on the original scopes and approved permissions by that service.
   * @summary Get the user credentials for this connection.
   * @param {string} connectionId The connection to get the stored credentials.
   * @param {string} [userId] The user to get the stored credentials, if not specified will automatically be populated by the token specified in the request to Authress.
   * @throws {ArgumentRequiredError}
   */
   getConnectionCredentials(connectionId: string, userId?: string): Promise<Response<UserConnectionCredentials>>;
}
