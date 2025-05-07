# Service Clients API


Method | HTTP request | Description
------------- | ------------- | -------------
[**createClient**](ServiceClientsApi.md#createClient) | **POST** /v1/clients | Create service client
[**deleteAccessKey**](ServiceClientsApi.md#deleteAccessKey) | **DELETE** /v1/clients/{clientId}/access-keys/{keyId} | Delete service client access key
[**deleteClient**](ServiceClientsApi.md#deleteClient) | **DELETE** /v1/clients/{clientId} | Delete service client
[**getClient**](ServiceClientsApi.md#getClient) | **GET** /v1/clients/{clientId} | Retrieve service client
[**getClients**](ServiceClientsApi.md#getClients) | **GET** /v1/clients | List service clients
[**requestAccessKey**](ServiceClientsApi.md#requestAccessKey) | **POST** /v1/clients/{clientId}/access-keys | Generate service client access key
[**updateClient**](ServiceClientsApi.md#updateClient) | **PUT** /v1/clients/{clientId} | Update service client



## createClient

> Client createClient(client)

Create service client

Creates a service client to interact with Authress or any other service on behalf of users. Each client has secret private keys used to authenticate with Authress. To use service clients created through other mechanisms, skip creating a client and create access records with the client identifier.

### Example

```javascript
import { AuthressClient, ServiceClient } from '@authress/sdk';

let client = new ServiceClient(); // Client | 
await new AuthressClient().serviceClients.createClient(client);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **client** | [**Client**](Client.md)|  | 

### Return type

[**Client**](Client.md)


## deleteAccessKey

> deleteAccessKey(clientId, keyId)

Delete service client access key

Deletes an access key for a client prevent it from being used to authenticate with Authress.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let clientId = "clientId_example"; // String | The unique identifier of the client.
let keyId = "keyId_example"; // String | The ID of the access key to remove from the client.
await new AuthressClient().serviceClients.deleteAccessKey(clientId, keyId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clientId** | **String**| The unique identifier of the client. | 
 **keyId** | **String**| The ID of the access key to remove from the client. | 


## deleteClient

> deleteClient(clientId)

Delete service client

This deletes the service client.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let clientId = "clientId_example"; // String | The unique identifier for the client.
await new AuthressClient().serviceClients.deleteClient(clientId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clientId** | **String**| The unique identifier for the client. | 


## getClient

> Client getClient(clientId)

Retrieve service client

Returns all information related to client except for the private access keys.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let clientId = "clientId_example"; // String | The unique identifier for the client.
await new AuthressClient().serviceClients.getClient(clientId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clientId** | **String**| The unique identifier for the client. | 

### Return type

[**Client**](Client.md)


## getClients

> ClientCollection getClients(opts)

List service clients

Returns all clients that the user has access to in the account.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let opts = {
  'limit': 20, // Number | Max number of results to return
  'cursor': "cursor_example" // String | Continuation cursor for paging.
};
await new AuthressClient().serviceClients.getClients(opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Max number of results to return | [optional] [default to 20]
 **cursor** | **String**| Continuation cursor for paging. | [optional] 

### Return type

[**ClientCollection**](ClientCollection.md)


## requestAccessKey

> ClientAccessKey requestAccessKey(clientId)

Generate service client access key

Create a new access key for the client or upload a compliant public key, so that a service can authenticate with Authress as that client. Using the client will allow delegation of permission checking of users. Enables machine-to-machine authentication between your services and with your end users. (There is a limit of 5 Active keys per client)

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let clientId = "clientId_example"; // String | The unique identifier of the client.
await new AuthressClient().serviceClients.requestAccessKey(clientId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clientId** | **String**| The unique identifier of the client. | 

### Return type

[**ClientAccessKey**](ClientAccessKey.md)


## updateClient

> Client updateClient(clientId, client)

Update service client

Updates a client information.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';

let clientId = "clientId_example"; // String | The unique identifier for the client.
let client = new ServiceClient(); // Client | 
await new AuthressClient().serviceClients.updateClient(clientId, client);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clientId** | **String**| The unique identifier for the client. | 
 **client** | [**Client**](Client.md)|  | 

### Return type

[**Client**](Client.md)

