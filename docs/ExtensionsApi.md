# Extensions API


Method | HTTP request | Description
------------- | ------------- | -------------
[**createExtension**](ExtensionsApi.md#createExtension) | **POST** /v1/extensions | Create extension
[**deleteExtension**](ExtensionsApi.md#deleteExtension) | **DELETE** /v1/extensions/{extensionId} | Delete extension
[**getExtension**](ExtensionsApi.md#getExtension) | **GET** /v1/extensions/{extensionId} | Retrieve extension
[**getExtensions**](ExtensionsApi.md#getExtensions) | **GET** /v1/extensions | List extensions
[**updateExtension**](ExtensionsApi.md#updateExtension) | **PUT** /v1/extensions/{extensionId} | Update extension



## createExtension

> Extension createExtension(extension)

Create extension

Specify the extension details for a new developer extension. Creating the extension enables developers to build applications that can log in to your platform and interact with your users&#39; data.

### Example

```javascript
import { AuthressClient, Extension } from '@authress/sdk';
let extension = new Extension(); // Extension | 
await new AuthressClient().extensions.createExtension(extension);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **extension** | [**Extension**](Extension.md)|  | 

### Return type

[**Extension**](Extension.md)


## deleteExtension

> deleteExtension(extensionId)

Delete extension

Deletes the specified extension. When deleted an extension can no longer be accessed. Additionally users cannot use that extension to log in, nor can the service client associated with the extension be used to access data secured by Authress. The related Access Records will automatically be deleted.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let extensionId = "extensionId_example"; // String | The extension identifier.
await new AuthressClient().extensions.deleteExtension(extensionId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **extensionId** | **String**| The extension identifier. | 


## getExtension

> Extension getExtension(extensionId)

Retrieve extension

Gets the platform extension details for the existing extension.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let extensionId = "extensionId_example"; // String | The extension identifier.
await new AuthressClient().extensions.getExtension(extensionId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **extensionId** | **String**| The extension identifier. | 

### Return type

[**Extension**](Extension.md)


## getExtensions

> ExtensionCollection getExtensions(opts)

List extensions

Lists the platform extensions. Extensions are the applications that developers of your platform have created for your users to interact with. Returns a paginated extension list for the account. Only extensions the user has access to are returned.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let opts = {
  'limit': 20, // Number | Max number of results to return
  'cursor': "cursor_example" // String | Continuation cursor for paging
};
await new AuthressClient().extensions.getExtensions(opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Max number of results to return | [optional] [default to 20]
 **cursor** | **String**| Continuation cursor for paging | [optional] 

### Return type

[**ExtensionCollection**](ExtensionCollection.md)

## updateExtension

> Extension updateExtension(extensionId, extension)

Update extension

Specify the updated extension. The extension will be updated and these changes will be reflected to the access control and user authentication associated with the extension.

### Example

```javascript
import { AuthressClient, Extension } from '@authress/sdk';
let extensionId = "extensionId_example"; // String | The extension identifier.
let extension = new Extension(); // Extension | 
await new AuthressClient().extensions.updateExtension(extensionId, extension);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **extensionId** | **String**| The extension identifier. | 
 **extension** | [**Extension**](Extension.md)|  | 

### Return type

[**Extension**](Extension.md)

