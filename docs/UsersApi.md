# Users API


Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteUser**](UsersApi.md#deleteUser) | **DELETE** /v1/users/{userId} | Delete a user
[**getUser**](UsersApi.md#getUser) | **GET** /v1/users/{userId} | Retrieve a user
[**getUsers**](UsersApi.md#getUsers) | **GET** /v1/users | List users
[**linkTenantUser**](UsersApi.md#linkTenantUser) | **PATCH** /v1/tenants/{tenantId}/users | Link tenant user



## deleteUser

> deleteUser(userId)

Delete a user

Removes the user, all access the user has been granted through Authress access records, and any related user data. This action is completed asynchronously.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let userId = "userId_example"; // UserId | The user identifier.
await new AuthressClient().users.deleteUser(userId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The user identifier. | 


## getUser

> UserIdentity getUser(userId)

Retrieve a user

Get the user data associated with a user. The data returned by this endpoint is highly variable based on the source OAuth provider. Avoid depending on undocumented properties.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let userId = "userId_example"; // UserId | The user identifier.
await new AuthressClient().users.getUser(userId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The user identifier. | 

### Return type

[**UserIdentity**](UserIdentity.md)


## getUsers

> UserIdentityCollection getUsers(opts)

List users

Returns a paginated user list for the account. The data returned by this endpoint is highly variable based on the source OAuth provider. Avoid depending on undocumented properties as these are subject to change and can be coupled to population directly by the user&#39;s login connection.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let opts = {
  'limit': 100, // Number | Max number of results to return
  'cursor': "cursor_example", // String | Continuation cursor for paging
  'filter': "filter_example", // String | Filter to search users by. This performs an optimized search for matching on properties in the user. The results may change over time based on improvements in the API.
  'tenantId': "tenantId_example" // TenantId | Return only users that are part of the specified tenant. Users can only be part of one tenant, using this parameter will limit returned users that have logged into this tenant.
};
await new AuthressClient().users.getUsers(opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Max number of results to return | [optional] [default: 100]
 **cursor** | **String**| Continuation cursor for paging | [optional] 
 **filter** | **String**| Filter to search users by. This performs an optimized search for matching on properties in the user. The results may change over time based on improvements in the API. | [optional] 
 **tenantId** | **String**| Return only users that are part of the specified tenant. Users can only be part of one tenant, using this parameter will limit returned users that have logged into this tenant. | [optional] 

### Return type

[**UserIdentityCollection**](UserIdentityCollection.md)


## linkTenantUser

> linkTenantUser(tenantId, tenantUser)

Link tenant user

Links an existing user to an existing tenant. This allows the user to log in via that tenant. Users that are linked with a tenant, will also be returned when fetching all the users linked with that tenant via the getUsers endpoint.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let tenantId = "tenantId_example"; // TenantId | The tenantId.
let tenantUser = new TenantUser(); // TenantUser | 
await new AuthressClient().users.linkTenantUser(tenantId, tenantUser);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | **String**| The tenantId. | 
 **tenantUser** | [**TenantUser**](TenantUser.md)|  | 

