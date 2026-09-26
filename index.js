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
const GroupsApi = require('./src/groupsApi');
const ServiceClientTokenProvider = require('./src/serviceClientTokenProvider');
const KmsServiceClientTokenProvider = require('./src/kmsServiceClientTokenProvider');
const TokenVerifier = require('./src/tokenVerifier');
const LoginApi = require('./src/loginApi');

class AuthressClient {
  constructor(settings, tokenProvider) {
    this.settings = settings || {};
    this.tokenProvider = typeof tokenProvider !== 'string' && tokenProvider
      || tokenProvider.startsWith('eyJ') && (() => tokenProvider)
      || new ServiceClientTokenProvider(tokenProvider, this.settings.baseUrl || this.settings.authressApiUrl);

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
    this.groups = new GroupsApi(this.httpClient);
    this.login = new LoginApi(this.httpClient);
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
}

const UnauthorizedError = require('./src/unauthorizedError');
const AuthressHttpError = require('./src/apiError');
const ClientNotAuthorizedToCheckPermissionError = require('./src/clientNotAuthorizedError');
const TokenVerificationError = require('./src/tokenVerificationError');

const { Invite } = require('./src/invites/dtos');
const { Connection, ConnectionData } = require('./src/connections/dtos');
const { GetUserResourcesParams } = require('./src/userPermissions/dtos');

const AccessRecord = Object.freeze({
  StatusEnum: Object.freeze({
    ACTIVE: 'ACTIVE',
    DELETED: 'DELETED'
  })
});

const ResourcePermissionsObject = Object.freeze({
  ActionEnum: Object.freeze({
    CLAIM: 'CLAIM',
    PUBLIC: 'PUBLIC'
  })
});

module.exports = {
  AuthressClient, ServiceClientTokenProvider, KmsServiceClientTokenProvider,
  UnauthorizedError, AuthressHttpError, ClientNotAuthorizedToCheckPermissionError,
  TokenVerifier, TokenVerificationError,
  Invite, Connection, ConnectionData, GetUserResourcesParams,
  AccessRecord, ResourcePermissionsObject
};
