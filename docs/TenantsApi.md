# Tenants API


Method | HTTP request | Description
------------- | ------------- | -------------
[**createTenant**](TenantsApi.md#createTenant) | **POST** /v1/tenants | Create tenant
[**deleteTenant**](TenantsApi.md#deleteTenant) | **DELETE** /v1/tenants/{tenantId} | Delete tenant
[**getTenant**](TenantsApi.md#getTenant) | **GET** /v1/tenants/{tenantId} | Retrieve tenant
[**getTenants**](TenantsApi.md#getTenants) | **GET** /v1/tenants | List tenants
[**linkTenantUser**](TenantsApi.md#linkTenantUser) | **PATCH** /v1/tenants/{tenantId}/users | Link tenant user
[**updateTenant**](TenantsApi.md#updateTenant) | **PUT** /v1/tenants/{tenantId} | Update tenant



## createTenant

> Tenant createTenant(tenant)

Create tenant

Specify tenant identity details for tenant tracking, separation, and user management. Tenant identifiers are persisted to access tokens created by Authress.

### Example

```javascript
import { AuthressClient, Tenant } from '@authress/sdk';

let tenant = new Tenant(); // Tenant | 
await new AuthressClient().tenants.createTenant(tenant);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant** | [**Tenant**](Tenant.md)|  | 

### Return type

[**Tenant**](Tenant.md)


## deleteTenant

> deleteTenant(tenantId)

Delete tenant

Delete a tenant. If a connection was created for the tenant then it is deleted as well.

### Example

```javascript
import { AuthressClient, Tenant } from '@authress/sdk';

let tenantId = "tenantId_example"; // TenantId | The tenantId.
await new AuthressClient().tenants.deleteTenant(tenantId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | **String**| The tenantId. | 


## getTenant

> Tenant getTenant(tenantId)

Retrieve tenant

Get the tenant details for an Authress tenant.

### Example

```javascript
import { AuthressClient, Tenant } from '@authress/sdk';

let tenantId = "tenantId_example"; // TenantId | The tenantId.
await new AuthressClient().tenants.getTenant(tenantId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | **String**| The tenantId. | 

### Return type

[**Tenant**](Tenant.md)


## getTenants

> TenantCollection getTenants(opts)

List tenants

Returns a paginated tenants list for the account. Only tenants the user has access to are returned.

### Example

```javascript
import { AuthressClient, Tenant } from '@authress/sdk';

let opts = {
  'limit': 100, // Number | Max number of results to return
  'cursor': "cursor_example", // String | Continuation cursor for paging
  'filter': "filter_example" // String | Filter to search tenants by. This performs an optimized search for matching on properties in the tenant. The results may change over time based on improvements in the API.
};
await new AuthressClient().tenants.getTenants(opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Max number of results to return | [optional] [default to 100]
 **cursor** | **String**| Continuation cursor for paging | [optional] 
 **filter** | **String**| Filter to search tenants by. This performs an optimized search for matching on properties in the tenant. The results may change over time based on improvements in the API. | [optional] 

### Return type

[**TenantCollection**](TenantCollection.md)


## linkTenantUser

> linkTenantUser(tenantId, tenantUser)

Link tenant user

Links an existing user to an existing tenant. This allows the user to log in via that tenant. Users that are linked with a tenant, will also be returned when fetching all the users linked with that tenant via the getUsers endpoint.

### Example

```javascript
import { AuthressClient, Tenant } from '@authress/sdk';

let tenantId = "tenantId_example"; // TenantId | The tenantId.
let tenantUser = new TenantUser(); // TenantUser | 
await new AuthressClient().tenants.linkTenantUser(tenantId, tenantUser);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | **String**| The tenantId. | 
 **tenantUser** | [**TenantUser**](TenantUser.md)|  | 


## updateTenant

> Tenant updateTenant(tenantId, tenant)

Update tenant

Updates the tenants information and linked tenant if it exists.

### Example

```javascript
import { AuthressClient, Tenant } from '@authress/sdk';

let tenantId = "tenantId_example"; // TenantId | The tenantId.
let tenant = new Tenant(); // Tenant | 
await new AuthressClient().tenants.updateTenant(tenantId, tenant);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | **String**| The tenantId. | 
 **tenant** | [**Tenant**](Tenant.md)|  | 

### Return type

[**Tenant**](Tenant.md)
