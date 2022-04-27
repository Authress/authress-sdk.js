const httpClient = require('./src/httpClient');
const AccessRecordsApi = require('./src/accessRecordsApi');
const UserPermissionsApi = require('./src/userPermissionsApi');
const UsersApi = require('./src/usersApi');
const ServiceClientsApi = require('./src/serviceClientsApi');
const ResourcesApi = require('./src/resourcesApi');
const AccountsApi = require('./src/accountsApi');
const RolesApi = require('./src/rolesApi');
const ConnectionsApi = require('./src/connectionsApi');

class AuthressClient {
  constructor(settings, tokenProvider) {
    this.settings = settings || {};
    this.tokenProvider = tokenProvider;

    this.httpClient = new httpClient(this.settings.baseUrl, this.tokenProvider);
    this.accessRecords = new AccessRecordsApi(this.httpClient);
    this.serviceClients = new ServiceClientsApi(this.httpClient);
    this.userPermissions = new UserPermissionsApi(this.httpClient);
    this.users = new UsersApi(this.httpClient);
    this.resources = new ResourcesApi(this.httpClient);
    this.accounts = new AccountsApi(this.httpClient);
    this.roles = new RolesApi(this.httpClient);
    this.connections = new ConnectionsApi(this.httpClient);
  }

  setToken(token) {
    this.httpClient.tokenProvider = () => token;
  }
}

const ServiceClientTokenProvider = require('./src/serviceClientTokenProvider');
const TokenVerifier = require('./src/tokenVerifier');
const UnauthorizedError = require('./src/unauthorizedError');
module.exports = { AuthressClient, ServiceClientTokenProvider, UnauthorizedError, TokenVerifier };

