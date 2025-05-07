# Applications API


Method | HTTP request | Description
------------- | ------------- | -------------
[**createApplication**](ApplicationsApi.md#createApplication) | **POST** /v1/applications | Create application
[**delegateUserLogin**](ApplicationsApi.md#delegateUserLogin) | **POST** /v1/applications/{applicationId}/users/{userId}/delegation | Log user into third-party application
[**deleteApplication**](ApplicationsApi.md#deleteApplication) | **DELETE** /v1/applications/{applicationId} | Delete the application
[**getApplication**](ApplicationsApi.md#getApplication) | **GET** /v1/applications/{applicationId} | Retrieve application
[**getApplications**](ApplicationsApi.md#getApplications) | **GET** /v1/applications | List applications
[**updateApplication**](ApplicationsApi.md#updateApplication) | **PUT** /v1/applications/{applicationId} | Update application



## createApplication

> Application createApplication(applicationRequest)

Create application

Specify application details for a new application that you own.

### Example

```javascript
import { AuthressClient, ApplicationRequest } from '@authress/sdk';
await new AuthressClient().applications.createApplication(applicationRequest);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **applicationRequest** | [**ApplicationRequest**](ApplicationRequest.md)|  | 

### Return type

[**Application**](Application.md)


## delegateUserLogin

> ApplicationDelegation delegateUserLogin(applicationId, userId)

Log user into third-party application

Redirect the user to an external application to login them in. Use this endpoint when you want to enable a user in your platform, identified by an Authress User ID, to log into a third party external application you do not control. The user will then be logged into that platform. Authress uses OpenID and SAML configuration to securely pass the user&#39;s login session in your platform to an external platform.&lt;br&gt;&lt;br&gt;For first party applications, use the Authress Login UI SDK. First party applications are those that your team, org, and company own, operate, and run (even if they are open source solutions). Third party applications are those that are operated by another company on a separate eTLD and you have no control over.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let applicationId = "applicationId_example"; // String | The third party application, the users wants to login using their Authress User Identity. Application IDs begin with app_.
let userId = "userId_example"; // UserId | The Authress user identifier.
await new AuthressClient().applications.delegateUserLogin(applicationId, userId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **applicationId** | **String**| The third party application, the users wants to login using their Authress User Identity. Application IDs begin with app_. | 
 **userId** | **String**| The Authress user identifier. | 

### Return type

[**ApplicationDelegation**](ApplicationDelegation.md)


## deleteApplication

> deleteApplication(applicationId)

Delete the application

Delete the configured Authress application details for your application.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let applicationId = "applicationId_example"; // String | The application identifier.
await new AuthressClient().applications.deleteApplication(applicationId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **applicationId** | **String**| The application identifier. | 


## getApplication

> Application getApplication(applicationId)

Retrieve application

Get the configured Authress application details.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let applicationId = "applicationId_example"; // String | The application identifier.
await new AuthressClient().applications.getApplication(applicationId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **applicationId** | **String**| The application identifier. | 

### Return type

[**Application**](Application.md)


## getApplications

> ApplicationCollection getApplications(opts)

List applications

Returns a paginated application list for the account. Only applications the user has access to are returned.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let opts = {
  'limit': 100, // Number | Max number of results to return
  'cursor': "cursor_example", // String | Continuation cursor for paging
  'filter': "filter_example" // String | Filter to search applications by. This performs an optimized search for matching on properties in the application. The results may change over time based on improvements in the API.
};
await new AuthressClient().applications.getApplications(opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Max number of results to return | [optional] [default to 100]
 **cursor** | **String**| Continuation cursor for paging | [optional] 
 **filter** | **String**| Filter to search applications by. This performs an optimized search for matching on properties in the application. The results may change over time based on improvements in the API. | [optional] 

### Return type

[**ApplicationCollection**](ApplicationCollection.md)


## updateApplication

> Application updateApplication(applicationId, applicationRequest)

Update application

Specify the updated configured Authress application details for your application.

### Example

```javascript
import { AuthressClient, ApplicationRequest } from '@authress/sdk';
let applicationId = "applicationId_example"; // String | The application identifier.
await new AuthressClient().applications.updateApplication(applicationId, applicationRequest);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **applicationId** | **String**| The application identifier. | 
 **applicationRequest** | [**ApplicationRequest**](ApplicationRequest.md)|  | 

### Return type

[**Application**](Application.md)

