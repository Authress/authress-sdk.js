# Login API

Method | HTTP request | Description
------------- | ------------- | -------------
[**updateAuthenticationrequest**](LoginApi.md#updateAuthenticationRequest) | **PATCH** /api/authentication/{authenticationRequestId} | Update authentication request

## updateAuthenticationRequest

> AuthenticationRequest updateAuthenticationRequest(authenticationRequestId, selfHostedLoginApplicationUrl, updateAuthenticationRequestParameters)

Update authentication request

Patch an authentication request and update the properties. Use this to add in a connection ID, tenant ID, or other parameters so the user can complete their authentication and log in. This method should always and only be called from your custom self-hosted login screen: https://authress.io/app/#/settings?focus=branding

### Example

```javascript
import { AuthressClient, Tenant } from '@authress/sdk';

const authenticationRequestId = request.body.state; // AuthenticationRequestId
const updateAuthenticationRequestParameters = new UpdateAuthenticationRequestParameters();
updateAuthenticationRequestParameters.connectionId = 'con_connectionID';
await new AuthressClient().login.updateAuthenticationRequest(authenticationRequestId, selfHostedLoginApplicationUrl, updateAuthenticationRequestParameters);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authenticationRequestId** | **String**| The ID of the authentication request. When redirected from the Authress authenticate() call, this value is found in the `state` parameter of the url. | 
 **selfHostedLoginApplicationUrl** | **String**| The application url for the self hosted login screen specified in the advanced options: https://authress.io/app/#/settings?focus=branding. If you are not using a self hosted login screen then this method should not be called. | 
 **updateAuthenticationRequestParameters** | [**UpdateAuthenticationRequestParameters**](UpdateAuthenticationRequestParameters.md)|  | The properties of the authentication request to updated.

### Return type

[**AuthenticationRequest**](AuthenticationRequest.md)
