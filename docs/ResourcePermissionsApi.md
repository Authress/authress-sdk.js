# Resource Permissions API


Method | HTTP request | Description
------------- | ------------- | -------------
[**getPermissionedResource**](ResourcePermissionsApi.md#getPermissionedResource) | **GET** /v1/resources/{resourceUri} | Retrieve resource configuration
[**getPermissionedResources**](ResourcePermissionsApi.md#getPermissionedResources) | **GET** /v1/resources | List all resource configurations
[**getResourceUsers**](ResourcePermissionsApi.md#getResourceUsers) | **GET** /v1/resources/{resourceUri}/users | List users with resource access
[**updatePermissionedResource**](ResourcePermissionsApi.md#updatePermissionedResource) | **PUT** /v1/resources/{resourceUri} | Update resource configuration



## getPermissionedResource

> PermissionedResource getPermissionedResource(resourceUri)

Retrieve resource configuration

Permissions can be set globally at a resource level. This will apply to all users in an account.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let resourceUri = "/organizations/org_a/documents/doc_1"; // String | The uri path of a resource to validate, must be URL encoded, uri segments are allowed.
await new AuthressClient().resourcePermissions.getPermissionedResource(resourceUri);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resourceUri** | **String**| The uri path of a resource to validate, must be URL encoded, uri segments are allowed. | 

### Return type

[**PermissionedResource**](PermissionedResource.md)


## getPermissionedResources

> PermissionedResourceCollection getPermissionedResources()

List all resource configurations

Permissions can be set globally at a resource level. This endpoint returns a list of resources with globally set resource permissions.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
await new AuthressClient().resourcePermissions.getPermissionedResources();
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**PermissionedResourceCollection**](PermissionedResourceCollection.md)


## getResourceUsers

> ResourceUsersCollection getResourceUsers(resourceUri, opts)

List users with resource access

Get the resource users with explicit access to the resource. This result is a list of users that have some permission to the resource. Users with access to parent resources and users with access only to a sub-resource will not be returned in this result. In the case that the resource has multiple users, the list will be paginated.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let resourceUri = "/organizations/org_a/documents/doc_1"; // String | The uri path of a resource to validate, must be URL encoded, uri segments are allowed.
let opts = {
  'limit': 20, // Number | Max number of results to return
  'cursor': "cursor_example" // String | Continuation cursor for paging
};
await new AuthressClient().resourcePermissions.getResourceUsers(resourceUri, opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resourceUri** | **String**| The uri path of a resource to validate, must be URL encoded, uri segments are allowed. | 
 **limit** | **Number**| Max number of results to return | [optional] [default to 20]
 **cursor** | **String**| Continuation cursor for paging | [optional] 

### Return type

[**ResourceUsersCollection**](ResourceUsersCollection.md)


## updatePermissionedResource

> updatePermissionedResource(resourceUri, permissionedResource)

Update resource configuration

Updates the global permissions on a resource. This applies to all users in an account.

### Example

```javascript
import { AuthressClient, PermissionedResource } from '@authress/sdk';
let resourceUri = "/organizations/org_a/documents/doc_1"; // String | The uri path of a resource to validate, must be URL encoded, uri segments are allowed.
let permissionedResource = new PermissionedResource(); // PermissionedResource | The contents of the permission to set on the resource. Overwrites existing data.
await new AuthressClient().resourcePermissions.updatePermissionedResource(resourceUri, permissionedResource);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resourceUri** | **String**| The uri path of a resource to validate, must be URL encoded, uri segments are allowed. | 
 **permissionedResource** | [**PermissionedResource**](PermissionedResource.md)| The contents of the permission to set on the resource. Overwrites existing data. | 

