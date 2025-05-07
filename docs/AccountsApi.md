# Accounts Api


Method | HTTP request | Description
------------- | ------------- | -------------
[**delegateAuthentication**](AccountsApi.md#delegateAuthentication) | **POST** /v1/identities | Link external provider
[**getAccount**](AccountsApi.md#getAccount) | **GET** /v1/accounts/{accountId} | Retrieve account information
[**getAccountIdentities**](AccountsApi.md#getAccountIdentities) | **GET** /v1/identities | List linked external providers
[**getAccounts**](AccountsApi.md#getAccounts) | **GET** /v1/accounts | List user Authress accounts



## delegateAuthentication

> delegateAuthentication(identityRequest)

Link external provider

An identity is a JWT subscriber *sub* and issuer *iss*. Only one account my be linked to a particular JWT combination. Allows calling the API with a federated token directly instead of using a client access key.

### Example

```javascript
import { AuthressClient, IdentityRequest } from '@authress/sdk';
await new AuthressClient().accounts.delegateAuthentication(identityRequest);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **identityRequest** | [**IdentityRequest**](IdentityRequest.md)|  | 


## getAccount

> Account getAccount(accountId)

Retrieve account information

Includes the original configuration information.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let accountId = "accountId_example"; // String | The unique identifier for the account
await new AuthressClient().accounts.getAccount(accountId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accountId** | **String**| The unique identifier for the account | 

### Return type

[**Account**](Account.md)


## getAccountIdentities

> IdentityCollection getAccountIdentities()

List linked external providers

Returns a list of identities linked for this account.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
await new AuthressClient().accounts.getAccountIdentities();
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**IdentityCollection**](IdentityCollection.md)


## getAccounts

> AccountCollection getAccounts(opts)

List user Authress accounts

Returns a list of accounts that the user has access to.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let opts = {
  'earliestCacheTime': new Date("2013-10-20T19:20:30+01:00") // Date | Ensure the accounts list is not cached before this time.
};
await new AuthressClient().accounts.getAccounts(opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **earliestCacheTime** | **Date**| Ensure the accounts list is not cached before this time. | [optional] 

### Return type

[**AccountCollection**](AccountCollection.md)

