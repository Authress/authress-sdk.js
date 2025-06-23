# User Permissions API


Method | HTTP request | Description
------------- | ------------- | -------------
[**authorizeUser**](UserPermissionsApi.md#authorizeUser) | **GET** /v1/users/{userId}/resources/{resourceUri}/permissions/{permission} | Verify user authorization
[**getUserPermissionsForResource**](UserPermissionsApi.md#getUserPermissionsForResource) | **GET** /v1/users/{userId}/resources/{resourceUri}/permissions | Get user permissions for resource
[**getUserResources**](UserPermissionsApi.md#getUserResources) | **GET** /v1/users/{userId}/resources | List user resources
[**getUserRolesForResource**](UserPermissionsApi.md#getUserRolesForResource) | **GET** /v1/users/{userId}/resources/{resourceUri}/roles | Get user roles for resource



## authorizeUser

> authorizeUser(userId, resourceUri, permission)

Verify user authorization

Performs the user authorization check. Does the user have the specified permission to the resource?

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let userId = "userId_example"; // UserId | The user identifier to check and verify the permissions of.
let resourceUri = "/organizations/org_a/documents/doc_1"; // String | The uri path of a resource to validate, must be URL encoded, uri segments are allowed, the resource must be a full path.
let permission = "permission_example"; // Action | Permission to check, '✶' and scoped permissions can also be checked here.
await new AuthressClient().userPermissions.authorizeUser(userId, resourceUri, permission);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The user identifier to check and verify the permissions of. | 
 **resourceUri** | **String**| The uri path of a resource to validate, must be URL encoded, uri segments are allowed, the resource must be a full path. | 
 **permission** | **Action**| Permission to check, &#39;✶&#39; and scoped permissions can also be checked here. | 


## getUserPermissionsForResource

> PermissionCollection getUserPermissionsForResource(userId, resourceUri)

Get user permissions for resource

Get a summary of the permissions a user has to a particular resource. For real time authorization checks, specify the permission.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let userId = "userId_example"; // UserId | The user identifier for the user to check permissions.
let resourceUri = "/organizations/org_a/documents/doc_1"; // String | The uri path of a resource to validate, must be URL encoded, uri segments are allowed.
await new AuthressClient().userPermissions.getUserPermissionsForResource(userId, resourceUri);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The user identifier for the user to check permissions. | 
 **resourceUri** | **String**| The uri path of a resource to validate, must be URL encoded, uri segments are allowed. | 

### Return type

[**PermissionCollection**](PermissionCollection.md)


## getUserResources

> UserResourcesCollection getUserResources(userId, opts)

List user resources

Get the users resources. This result is a list of resource uris that a user has an permission to. By default only the top level matching resources are returned. To get a user&#39;s list of deeply nested resources, set the &#x60;collectionConfiguration&#x60; to be &#x60;INCLUDE_NESTED&#x60;. This collection is paginated.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let userId = "userId_example"; // UserId | The user identifier for which to list all accessible resources.
let opts = {
  'resourceUri': "/organizations", // String | The top level uri path of a resource to query for. Will only match explicit or nested sub-resources. Will not partial match resource names.
  'collectionConfiguration': "'TOP_LEVEL_ONLY'", // String | `TOP_LEVEL_ONLY` - returns only directly nested resources under the resourceUri. A query to `resourceUri=Collection` will return `Collection/resource_1`.<br>`INCLUDE_NESTED` - will return all sub-resources as well as deeply nested resources that the user has the specified permission to. A query to `resourceUri=Collection` will return `Collection/namespaces/ns/resources/resource_1`.<br><br>To return matching resources for nested resources, set this parameter to `INCLUDE_NESTED`.
  'permissions': "permissions_example", // Action | Permission to check, '✶' and scoped permissions can also be checked here. By default if the user has any permission explicitly to a resource, it will be included in the list.
  'limit': 20, // Number | Max number of results to return
  'cursor': "cursor_example" // String | Continuation cursor for paging
};
await new AuthressClient().userPermissions.getUserResources(userId, opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The user identifier for which to list all accessible resources. | 
 **resourceUri** | **String**| The top level uri path of a resource to query for. Will only match explicit or nested sub-resources. Will not partial match resource names. | [optional] 
 **collectionConfiguration** | **String**| &#x60;TOP_LEVEL_ONLY&#x60; - returns only directly nested resources under the resourceUri. A query to &#x60;resourceUri&#x3D;Collection&#x60; will return &#x60;Collection/resource_1&#x60;.&lt;br&gt;&#x60;INCLUDE_NESTED&#x60; - will return all sub-resources as well as deeply nested resources that the user has the specified permission to. A query to &#x60;resourceUri&#x3D;Collection&#x60; will return &#x60;Collection/namespaces/ns/resources/resource_1&#x60;.&lt;br&gt;&lt;br&gt;To return matching resources for nested resources, set this parameter to &#x60;INCLUDE_NESTED&#x60;. | [optional] [default: &#39;TOP_LEVEL_ONLY&#39;]
 **permissions** | **Action**| Permission to check, &#39;✶&#39; and scoped permissions can also be checked here. By default if the user has any permission explicitly to a resource, it will be included in the list. | [optional] 
 **limit** | **Number**| Max number of results to return | [optional] [default: 20]
 **cursor** | **String**| Continuation cursor for paging | [optional] 

### Return type

[**UserResourcesCollection**](UserResourcesCollection.md)


## getUserRolesForResource

> UserRoleCollection getUserRolesForResource(userId, resourceUri)

Get user roles for resource

Get a summary of the roles a user has to a particular resource. Users can be assigned roles from multiple access records, this may cause the same role to appear in the list more than once. Only contains explicitly roles assigned to the user for the specified resources. Roles granted to the user for the resource due to a parent resource assignment are not returned. For real time authorization checks, use the  /permission endpoint and specify the explicit permission.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let userId = "userId_example"; // UserId | The user to get roles for.
let resourceUri = "/organizations/org_a/documents/doc_1"; // String | The uri path of a resource to get roles for, must be URL encoded. Checks for explicit resource roles, roles attached to parent resources are not returned.
await new AuthressClient().userPermissions.getUserRolesForResource(userId, resourceUri);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The user to get roles for. | 
 **resourceUri** | **String**| The uri path of a resource to get roles for, must be URL encoded. Checks for explicit resource roles, roles attached to parent resources are not returned. | 

### Return type

[**UserRoleCollection**](UserRoleCollection.md)

