const httpClient = require('./src/httpClient');
const AccessRecordsApi = require('./src/accessRecordsApi');
const InvitesApi = require('./src/invitesApi');
const UserPermissionsApi = require('./src/userPermissionsApi');
const UsersApi = require('./src/usersApi');
const ServiceClientsApi = require('./src/serviceClientsApi');
const ResourcesApi = require('./src/resourcesApi');
const AccountsApi = require('./src/accountsApi');
const RolesApi = require('./src/rolesApi');
const ConnectionsApi = require('./src/connectionsApi');
const ExtensionsApi = require('./src/extensionsApi');
const TenantsApi = require('./src/tenantsApi');
const ServiceClientTokenProvider = require('./src/serviceClientTokenProvider');
const TokenVerifier = require('./src/tokenVerifier');
const jwtManager = require('./src/jwtManager');

class AuthressClient {
  constructor(settings, tokenProvider) {
    this.settings = settings || {};
    this.tokenProvider = typeof tokenProvider === 'string' ? new ServiceClientTokenProvider(tokenProvider, this.settings.baseUrl || this.settings.authressApiUrl) : tokenProvider;

    this.httpClient = new httpClient(this.settings.baseUrl || this.settings.authressApiUrl, this.tokenProvider, this.settings.userAgent);
    this.accessRecords = new AccessRecordsApi(this.httpClient);
    this.invites = new InvitesApi(this.httpClient);
    this.serviceClients = new ServiceClientsApi(this.httpClient);
    this.userPermissions = new UserPermissionsApi(this.httpClient);
    this.users = new UsersApi(this.httpClient);
    this.resources = new ResourcesApi(this.httpClient);
    this.accounts = new AccountsApi(this.httpClient);
    this.roles = new RolesApi(this.httpClient);
    this.connections = new ConnectionsApi(this.httpClient);
    this.extensions = new ExtensionsApi(this.httpClient);
    this.tenants = new TenantsApi(this.httpClient);
  }

  /**
   * Deprecated: Will be removed in library version 4.0
   */
  setToken(token) {
    this.httpClient.tokenProvider = () => token;
  }

  verifyToken(token) {
    return TokenVerifier(this.httpClient, token);
  }

  /**
   * @description When a platform extension attempts to log a user in, the Authress Login page will redirect to your Platform defaultAuthenticationUrl. At this point, show the user the login screen, and then pass the results of the login to this method.
   * @param {String} [state] The redirect to your login screen will contain two query parameters `state` and `flow`. Pass the state into this method.
   * @param {String} [connectionId] Specify which provider connection that user would like to use to log in - see https://authress.io/app/#/manage?focus=connections
   * @param {String} [tenantLookupIdentifier] Instead of connectionId, specify the tenant lookup identifier to log the user with the mapped tenant - see https://authress.io/app/#/manage?focus=tenants
   * @param {String} [hint] Instead of connectionId or tenant lookup identifier, specify the user's domain or the full email for the user to dynamically identify and log the user with the mapped tenant.
   * @param {Object} [connectionProperties] Connection specific properties to pass to the identity provider. Can be used to override default scopes for example.
   * @return {Promise<AuthenticateResponse>} The authentication response.
   */
  async updateExtensionAuthenticationRequest({ state, connectionId, tenantLookupIdentifier, connectionProperties, hint }) {
    if (!connectionId && !tenantLookupIdentifier && !hint) {
      const e = Error('connectionId or tenantLookupIdentifier must be specified');
      e.code = 'InvalidConnection';
      throw e;
    }

    const authenticationRequestId = state;
    if (!authenticationRequestId) {
      const e = Error('The `state` parameters must be specified to update this authentication request');
      e.code = 'InvalidAuthenticationRequest';
      throw e;
    }

    try {
      const resolvedTenantLookupIdentifier = hint || tenantLookupIdentifier;
      const antiAbuseHash = await jwtManager.calculateAntiAbuseHash({ connectionId, tenantLookupIdentifier: resolvedTenantLookupIdentifier, authenticationRequestId });
      const requestOptions = await this.httpClient.patch(`/api/authentication/${authenticationRequestId}`, {
        antiAbuseHash,
        connectionId,
        tenantLookupIdentifier: resolvedTenantLookupIdentifier,
        connectionProperties
      });

      return requestOptions.data;
    } catch (error) {
      if (error.status && error.status >= 400 && error.status < 500) {
        const e = Error(error.data && (error.data.title || error.data.errorCode) || error.data || 'Unknown Error');
        e.code = error.data && error.data.errorCode;
        throw e;
      }
      throw (error.data || error);
    }
  }
}

const UnauthorizedError = require('./src/unauthorizedError');
const ApiError = require('./src/apiError');

module.exports = { AuthressClient, ServiceClientTokenProvider, UnauthorizedError, ApiError, TokenVerifier };

