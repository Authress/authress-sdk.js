[Back to Repository](../README.md)

## Documentation for API Endpoints

All URIs are relative to your [Authress Host URL](https://authress.io/app/#/api).

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*authress.accessRecords* | [**createClaim**](./AccessRecordsApi.md#createClaim) | **POST** /v1/claims | Create resource Claim
*authress.accessRecords* | [**createRecord**](./AccessRecordsApi.md#createRecord) | **POST** /v1/records | Create access record
*authress.accessRecords* | [**createRequest**](./AccessRecordsApi.md#createRequest) | **POST** /v1/requests | Create access request
*authress.accessRecords* | [**deleteRecord**](./AccessRecordsApi.md#deleteRecord) | **DELETE** /v1/records/{recordId} | Delete access record
*authress.accessRecords* | [**deleteRequest**](./AccessRecordsApi.md#deleteRequest) | **DELETE** /v1/requests/{requestId} | Delete access request
*authress.accessRecords* | [**getRecord**](./AccessRecordsApi.md#getRecord) | **GET** /v1/records/{recordId} | Retrieve access record
*authress.accessRecords* | [**getRecords**](./AccessRecordsApi.md#getRecords) | **GET** /v1/records | List access records
*authress.accessRecords* | [**getRequest**](./AccessRecordsApi.md#getRequest) | **GET** /v1/requests/{requestId} | Retrieve access request
*authress.accessRecords* | [**getRequests**](./AccessRecordsApi.md#getRequests) | **GET** /v1/requests | List access requests
*authress.accessRecords* | [**respondToAccessRequest**](./AccessRecordsApi.md#respondToAccessRequest) | **PATCH** /v1/requests/{requestId} | Approve or deny access request
*authress.accessRecords* | [**updateRecord**](./AccessRecordsApi.md#updateRecord) | **PUT** /v1/records/{recordId} | Update access record
*Authress.accounts* | [**delegateAuthentication**](./AccountsApi.md#delegateAuthentication) | **POST** /v1/identities | Link external provider
*Authress.accounts* | [**getAccount**](./AccountsApi.md#getAccount) | **GET** /v1/accounts/{accountId} | Retrieve account information
*Authress.accounts* | [**getAccountIdentities**](./AccountsApi.md#getAccountIdentities) | **GET** /v1/identities | List linked external providers
*Authress.accounts* | [**getAccounts**](./AccountsApi.md#getAccounts) | **GET** /v1/accounts | List user Authress accounts
*Authress.applications* | [**createApplication**](./ApplicationsApi.md#createApplication) | **POST** /v1/applications | Create application
*Authress.applications* | [**delegateUserLogin**](./ApplicationsApi.md#delegateUserLogin) | **POST** /v1/applications/{applicationId}/users/{userId}/delegation | Log user into third-party application
*Authress.applications* | [**deleteApplication**](./ApplicationsApi.md#deleteApplication) | **DELETE** /v1/applications/{applicationId} | Delete the application
*Authress.applications* | [**getApplication**](./ApplicationsApi.md#getApplication) | **GET** /v1/applications/{applicationId} | Retrieve application
*Authress.applications* | [**getApplications**](./ApplicationsApi.md#getApplications) | **GET** /v1/applications | List applications
*Authress.applications* | [**updateApplication**](./ApplicationsApi.md#updateApplication) | **PUT** /v1/applications/{applicationId} | Update application
*Authress.connections* | [**createConnection**](./ConnectionsApi.md#createConnection) | **POST** /v1/connections | Create SSO connection
*Authress.connections* | [**deleteConnection**](./ConnectionsApi.md#deleteConnection) | **DELETE** /v1/connections/{connectionId} | Delete SSO connection
*Authress.connections* | [**getConnection**](./ConnectionsApi.md#getConnection) | **GET** /v1/connections/{connectionId} | Retrieve SSO connection
*Authress.connections* | [**getConnectionCredentials**](./ConnectionsApi.md#getConnectionCredentials) | **GET** /v1/connections/{connectionId}/users/{userId}/credentials | Retrieve user connection credentials
*Authress.connections* | [**getConnections**](./ConnectionsApi.md#getConnections) | **GET** /v1/connections | List SSO connections
*Authress.connections* | [**updateConnection**](./ConnectionsApi.md#updateConnection) | **PUT** /v1/connections/{connectionId} | Update SSO connection
*Authress.extensions* | [**createExtension**](./ExtensionsApi.md#createExtension) | **POST** /v1/extensions | Create extension
*Authress.extensions* | [**deleteExtension**](./ExtensionsApi.md#deleteExtension) | **DELETE** /v1/extensions/{extensionId} | Delete extension
*Authress.extensions* | [**getExtension**](./ExtensionsApi.md#getExtension) | **GET** /v1/extensions/{extensionId} | Retrieve extension
*Authress.extensions* | [**getExtensions**](./ExtensionsApi.md#getExtensions) | **GET** /v1/extensions | List extensions
*Authress.extensions* | [**requestToken**](./ExtensionsApi.md#requestToken) | **POST** /api/authentication/oauth/tokens | OAuth Token
*Authress.extensions* | [**updateExtension**](./ExtensionsApi.md#updateExtension) | **PUT** /v1/extensions/{extensionId} | Update extension
*Authress.groups* | [**createGroup**](./GroupsApi.md#createGroup) | **POST** /v1/groups | Create group
*Authress.groups* | [**deleteGroup**](./GroupsApi.md#deleteGroup) | **DELETE** /v1/groups/{groupId} | Delete group
*Authress.groups* | [**getGroup**](./GroupsApi.md#getGroup) | **GET** /v1/groups/{groupId} | Retrieve group
*Authress.groups* | [**getGroups**](./GroupsApi.md#getGroups) | **GET** /v1/groups | List groups
*Authress.groups* | [**updateGroup**](./GroupsApi.md#updateGroup) | **PUT** /v1/groups/{groupId} | Update a group
*Authress.invites* | [**createInvite**](./InvitesApi.md#createInvite) | **POST** /v1/invites | Create user invite
*Authress.invites* | [**deleteInvite**](./InvitesApi.md#deleteInvite) | **DELETE** /v1/invites/{inviteId} | Delete invite
*Authress.invites* | [**getInvite**](./InvitesApi.md#getInvite) | **GET** /v1/invites/{inviteId} | Retrieve invite
*Authress.invites* | [**respondToInvite**](./InvitesApi.md#respondToInvite) | **PATCH** /v1/invites/{inviteId} | Accept invite
*Authress.resourcePermissions* | [**getPermissionedResource**](./ResourcePermissionsApi.md#getPermissionedResource) | **GET** /v1/resources/{resourceUri} | Retrieve resource configuration
*Authress.resourcePermissions* | [**getPermissionedResources**](./ResourcePermissionsApi.md#getPermissionedResources) | **GET** /v1/resources | List all resource configurations
*Authress.resourcePermissions* | [**getResourceUsers**](./ResourcePermissionsApi.md#getResourceUsers) | **GET** /v1/resources/{resourceUri}/users | List users with resource access
*Authress.resourcePermissions* | [**updatePermissionedResource**](./ResourcePermissionsApi.md#updatePermissionedResource) | **PUT** /v1/resources/{resourceUri} | Update resource configuration
*Authress.roles* | [**createRole**](./RolesApi.md#createRole) | **POST** /v1/roles | Create role
*Authress.roles* | [**deleteRole**](./RolesApi.md#deleteRole) | **DELETE** /v1/roles/{roleId} | Delete role
*Authress.roles* | [**getRole**](./RolesApi.md#getRole) | **GET** /v1/roles/{roleId} | Retrieve role
*Authress.roles* | [**getRoles**](./RolesApi.md#getRoles) | **GET** /v1/roles | List roles
*Authress.roles* | [**updateRole**](./RolesApi.md#updateRole) | **PUT** /v1/roles/{roleId} | Update role
*Authress.serviceClients* | [**createClient**](./ServiceClientsApi.md#createClient) | **POST** /v1/clients | Create service client
*Authress.serviceClients* | [**deleteAccessKey**](./ServiceClientsApi.md#deleteAccessKey) | **DELETE** /v1/clients/{clientId}/access-keys/{keyId} | Delete service client access key
*Authress.serviceClients* | [**deleteClient**](./ServiceClientsApi.md#deleteClient) | **DELETE** /v1/clients/{clientId} | Delete service client
*Authress.serviceClients* | [**getClient**](./ServiceClientsApi.md#getClient) | **GET** /v1/clients/{clientId} | Retrieve service client
*Authress.serviceClients* | [**getClients**](./ServiceClientsApi.md#getClients) | **GET** /v1/clients | List service clients
*Authress.serviceClients* | [**requestAccessKey**](./ServiceClientsApi.md#requestAccessKey) | **POST** /v1/clients/{clientId}/access-keys | Generate service client access key
*Authress.serviceClients* | [**updateClient**](./ServiceClientsApi.md#updateClient) | **PUT** /v1/clients/{clientId} | Update service client
*Authress.tenants* | [**createTenant**](./TenantsApi.md#createTenant) | **POST** /v1/tenants | Create tenant
*Authress.tenants* | [**deleteTenant**](./TenantsApi.md#deleteTenant) | **DELETE** /v1/tenants/{tenantId} | Delete tenant
*Authress.tenants* | [**getTenant**](./TenantsApi.md#getTenant) | **GET** /v1/tenants/{tenantId} | Retrieve tenant
*Authress.tenants* | [**getTenants**](./TenantsApi.md#getTenants) | **GET** /v1/tenants | List tenants
*Authress.tenants* | [**linkTenantUser**](./TenantsApi.md#linkTenantUser) | **PATCH** /v1/tenants/{tenantId}/users | Link tenant user
*Authress.tenants* | [**updateTenant**](./TenantsApi.md#updateTenant) | **PUT** /v1/tenants/{tenantId} | Update tenant
*Authress.userPermissions* | [**authorizeUser**](./UserPermissionsApi.md#authorizeUser) | **GET** /v1/users/{userId}/resources/{resourceUri}/permissions/{permission} | Verify user authorization
*Authress.userPermissions* | [**getUserPermissionsForResource**](./UserPermissionsApi.md#getUserPermissionsForResource) | **GET** /v1/users/{userId}/resources/{resourceUri}/permissions | Get user permissions for resource
*Authress.userPermissions* | [**getUserResources**](./UserPermissionsApi.md#getUserResources) | **GET** /v1/users/{userId}/resources | List user resources
*Authress.userPermissions* | [**getUserRolesForResource**](./UserPermissionsApi.md#getUserRolesForResource) | **GET** /v1/users/{userId}/resources/{resourceUri}/roles | Get user roles for resource
*Authress.users* | [**deleteUser**](./UsersApi.md#deleteUser) | **DELETE** /v1/users/{userId} | Delete a user
*Authress.users* | [**getUser**](./UsersApi.md#getUser) | **GET** /v1/users/{userId} | Retrieve a user
*Authress.users* | [**getUsers**](./UsersApi.md#getUsers) | **GET** /v1/users | List users
*Authress.users* | [**linkTenantUser**](./UsersApi.md#linkTenantUser) | **PATCH** /v1/tenants/{tenantId}/users | Link tenant user


## Documentation for Models

 - [AccessRecord](./AccessRecord.md)
 - [AccessRecordAccount](./AccessRecordAccount.md)
 - [AccessRecordCollection](./AccessRecordCollection.md)
 - [AccessRequest](./AccessRequest.md)
 - [AccessRequestCollection](./AccessRequestCollection.md)
 - [AccessRequestResponse](./AccessRequestResponse.md)
 - [AccessTemplate](./AccessTemplate.md)
 - [Account](./Account.md)
 - [AccountCollection](./AccountCollection.md)
 - [AccountLinks](./AccountLinks.md)
 - [Application](./Application.md)
 - [ApplicationCollection](./ApplicationCollection.md)
 - [ApplicationDelegation](./ApplicationDelegation.md)
 - [ApplicationRequest](./ApplicationRequest.md)
 - [AuthenticationTokenConfiguration](./AuthenticationTokenConfiguration.md)
 - [ClaimRequest](./ClaimRequest.md)
 - [Client](./Client.md)
 - [ClientAccessKey](./ClientAccessKey.md)
 - [ClientCollection](./ClientCollection.md)
 - [ClientOptions](./ClientOptions.md)
 - [ClientRateLimit](./ClientRateLimit.md)
 - [CollectionLinks](./CollectionLinks.md)
 - [Connection](./Connection.md)
 - [ConnectionCollection](./ConnectionCollection.md)
 - [ConnectionConditions](./ConnectionConditions.md)
 - [ConnectionData](./ConnectionData.md)
 - [ConnectionDefaultConnectionProperties](./ConnectionDefaultConnectionProperties.md)
 - [ConnectionLinkingConfiguration](./ConnectionLinkingConfiguration.md)
 - [ConnectionTenantConfiguration](./ConnectionTenantConfiguration.md)
 - [ConnectionUserDataConfiguration](./ConnectionUserDataConfiguration.md)
 - [Extension](./Extension.md)
 - [ExtensionApplication](./ExtensionApplication.md)
 - [ExtensionClient](./ExtensionClient.md)
 - [ExtensionCollection](./ExtensionCollection.md)
 - [Group](./Group.md)
 - [GroupCollection](./GroupCollection.md)
 - [Identity](./Identity.md)
 - [IdentityCollection](./IdentityCollection.md)
 - [IdentityRequest](./IdentityRequest.md)
 - [Invite](./Invite.md)
 - [InviteStatement](./InviteStatement.md)
 - [Link](./Link.md)
 - [LinkedGroup](./LinkedGroup.md)
 - [Links](./Links.md)
 - [OAuthAuthorizeResponse](./OAuthAuthorizeResponse.md)
 - [OAuthTokenRequest](./OAuthTokenRequest.md)
 - [OAuthTokenResponse](./OAuthTokenResponse.md)
 - [Pagination](./Pagination.md)
 - [PaginationNext](./PaginationNext.md)
 - [PermissionCollection](./PermissionCollection.md)
 - [PermissionCollectionAccount](./PermissionCollectionAccount.md)
 - [PermissionObject](./PermissionObject.md)
 - [PermissionedResource](./PermissionedResource.md)
 - [PermissionedResourceCollection](./PermissionedResourceCollection.md)
 - [Resource](./Resource.md)
 - [ResourcePermission](./ResourcePermission.md)
 - [ResourceUsersCollection](./ResourceUsersCollection.md)
 - [ResponseError](./ResponseError.md)
 - [Role](./Role.md)
 - [RoleCollection](./RoleCollection.md)
 - [Statement](./Statement.md)
 - [Tenant](./Tenant.md)
 - [TenantCollection](./TenantCollection.md)
 - [TenantConnection](./TenantConnection.md)
 - [TenantData](./TenantData.md)
 - [TenantDomain](./TenantDomain.md)
 - [TenantUser](./TenantUser.md)
 - [TokenRequest](./TokenRequest.md)
 - [User](./User.md)
 - [UserConnectionCredentials](./UserConnectionCredentials.md)
 - [UserIdentity](./UserIdentity.md)
 - [UserIdentityCollection](./UserIdentityCollection.md)
 - [UserResourcesCollection](./UserResourcesCollection.md)
 - [UserRole](./UserRole.md)
 - [UserRoleCollection](./UserRoleCollection.md)
 - [UserToken](./UserToken.md)
