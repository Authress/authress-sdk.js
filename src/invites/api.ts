/* eslint-disable node/no-missing-import */
import { Response } from '../response';
import { Invite } from './dtos';

/**
 * InvitesApi
 * @export
 */
export interface InvitesApi {
  /**
   * Invites are used to easily assign permissions to users that have not been created in your identity provider yet. 1. This generates an invite record. 2. Send the invite ID to the user. 3. Log the user in. 4. As the user PATCH the /invite/{inviteId} endpoint 5. This accepts the invite.         When the user accepts the invite they will automatically receive the permissions assigned in the Invite. Invites automatically expire after 7 days.
   * @summary Create user invite
   * @param {Invite} body
   * @throws {ArgumentRequiredError}
   */
  createInvite(body: Invite): Promise<Response<Invite>>;

  /**
   * Deletes an invite.
   * @summary Delete invite
   * @param {string} inviteId The identifier of the invite.
   * @throws {ArgumentRequiredError}
   */
  deleteInvite(inviteId: string): Promise<Response<void>>;
  /**
   * Accepts an invite by claiming this invite by this user. The user access token used for this request will gain the permissions associated with the invite.
   * @summary Accept invite
   * @param {string} inviteId The identifier of the invite.
   * @throws {RequiredError}
   */
  respondToInvite(inviteId: string): Promise<Response<void>>;
  /**
   * Gets the invite along with the relevant invite data. Invites enable users inviting other users to their tenant, organization, or account.
   * @summary Get an invite for the account.
   * @param {string} inviteId The identifier of the invite.
   * @throws {ArgumentRequiredError}
   */
  getInvite(inviteId: string): Promise<Response<Invite>>;
}
