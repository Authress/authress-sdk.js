# Roles API


Method | HTTP request | Description
------------- | ------------- | -------------
[**createRole**](RolesApi.md#createRole) | **POST** /v1/roles | Create role
[**deleteRole**](RolesApi.md#deleteRole) | **DELETE** /v1/roles/{roleId} | Delete role
[**getRole**](RolesApi.md#getRole) | **GET** /v1/roles/{roleId} | Retrieve role
[**getRoles**](RolesApi.md#getRoles) | **GET** /v1/roles | List roles
[**updateRole**](RolesApi.md#updateRole) | **PUT** /v1/roles/{roleId} | Update role



## createRole

> Role createRole(role)

Create role

Creates a role with permissions.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let role = new Role(); // Role | 
await new AuthressClient().roles.createRole(role);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | [**Role**](Role.md)|  | 

### Return type

[**Role**](Role.md)


## deleteRole

> deleteRole(roleId)

Delete role

Remove a role. If a record references the role, that record will not be modified.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let roleId = "roleId_example"; // RoleId | The identifier of the role.
await new AuthressClient().roles.deleteRole(roleId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **roleId** | **String**| The identifier of the role. | 


## getRole

> Role getRole(roleId)

Retrieve role

Roles contain a list of permissions that will be applied to any user or resource

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let roleId = "roleId_example"; // RoleId | The identifier of the role.
await new AuthressClient().roles.getRole(roleId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **roleId** | **String**| The identifier of the role. | 

### Return type

[**Role**](Role.md)


## getRoles

> RoleCollection getRoles(opts)

List roles

Get all the account roles. Roles contain a list of permissions that will be applied to any user or resource

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let opts = {
  'limit': 100, // Number | Max number of results to return.
  'cursor': "cursor_example", // String | Continuation cursor for paging.
  'filter': "filter_example" // String | Filter to search roles by. This performs an optimized search for matching on properties in the role. The results may change over time based on improvements in the API.
};
await new AuthressClient().roles.getRoles(opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Max number of results to return. | [optional] [default to 100]
 **cursor** | **String**| Continuation cursor for paging. | [optional] 
 **filter** | **String**| Filter to search roles by. This performs an optimized search for matching on properties in the role. The results may change over time based on improvements in the API. | [optional] 

### Return type

[**RoleCollection**](RoleCollection.md)


## updateRole

> Role updateRole(roleId, role)

Update role

Updates a role adding or removing permissions.

### Example

```javascript
import { AuthressClient, Role } from '@authress/sdk';

let roleId = "roleId_example"; // RoleId | The identifier of the role.
let role = new Role(); // Role | 
await new AuthressClient().roles.updateRole(roleId, role);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **roleId** | **String**| The identifier of the role. | 
 **role** | [**Role**](Role.md)|  | 

### Return type

[**Role**](Role.md)

