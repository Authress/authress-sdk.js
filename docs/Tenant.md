# Tenant

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tenantId** | **String** |  | [optional] 
**tenantLookupIdentifier** | **String** |  | [optional] 
**data** | [**TenantData**](TenantData.md) |  | [optional] 
**domains** | [**[TenantDomain]**](TenantDomain.md) | The associated user email domains that are mapped to this tenant. When a user starts the authentication process, if they are using SSO, Authress will use their specified email address to identify which Authress Tenant to log the user in with. Only specify domains here after you have verified that the tenant owns the email domain. | [optional] 
**connection** | [**TenantConnection**](TenantConnection.md) |  | [optional] 
**tokenConfiguration** | [**AuthenticationTokenConfiguration**](AuthenticationTokenConfiguration.md) |  | [optional] 
**createdTime** | **Date** |  | [optional] [readonly] 


