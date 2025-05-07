# Access Records


Method | HTTP request | Description
------------- | ------------- | -------------
[**createClaim**](AccessRecordsApi.md#createClaim) | **POST** /v1/claims | Create resource Claim
[**createRecord**](AccessRecordsApi.md#createRecord) | **POST** /v1/records | Create access record
[**createRequest**](AccessRecordsApi.md#createRequest) | **POST** /v1/requests | Create access request
[**deleteRecord**](AccessRecordsApi.md#deleteRecord) | **DELETE** /v1/records/{recordId} | Delete access record
[**deleteRequest**](AccessRecordsApi.md#deleteRequest) | **DELETE** /v1/requests/{requestId} | Delete access request
[**getRecord**](AccessRecordsApi.md#getRecord) | **GET** /v1/records/{recordId} | Retrieve access record
[**getRecords**](AccessRecordsApi.md#getRecords) | **GET** /v1/records | List access records
[**getRequest**](AccessRecordsApi.md#getRequest) | **GET** /v1/requests/{requestId} | Retrieve access request
[**getRequests**](AccessRecordsApi.md#getRequests) | **GET** /v1/requests | List access requests
[**respondToAccessRequest**](AccessRecordsApi.md#respondToAccessRequest) | **PATCH** /v1/requests/{requestId} | Approve or deny access request
[**updateRecord**](AccessRecordsApi.md#updateRecord) | **PUT** /v1/records/{recordId} | Update access record



## createClaim

> Object createClaim(claimRequest)

Create resource Claim

Claim a resource by allowing a user to pick an identifier and receive admin access to that resource if it hasn&#39;t already been claimed. This only works for resources specifically marked as &lt;strong&gt;CLAIM&lt;/strong&gt;. The result will be a new access record listing that user as the admin for this resource. The resourceUri will be appended to the collection resource uri using a &#x60;/&#x60; (forward slash) automatically.

### Example

```javascript
import { AuthressClient, AccessRecord, ClaimRequest } from '@authress/sdk';

await new AuthressClient().accessRecords.createClaim(claimRequest);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **claimRequest** | [**ClaimRequest**](ClaimRequest.md)|  | 

### Return type

**Object**


## createRecord

> AccessRecord createRecord(accessRecord)

Create access record

Specify user roles for specific resources. (Records have a maximum size of ~100KB)

### Example

```javascript
import { AuthressClient, AccessRecord } from '@authress/sdk';


await new AuthressClient().accessRecords.createRecord(accessRecord);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accessRecord** | [**AccessRecord**](AccessRecord.md)|  | 

### Return type

[**AccessRecord**](AccessRecord.md)


## createRequest

> AccessRequest createRequest(accessRequest)

Create access request

Specify a request in the form of an access record that an admin can approve.

### Example

```javascript
import { AuthressClient, AccessRequest } from '@authress/sdk';

await new AuthressClient().accessRecords.createRequest(accessRequest);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accessRequest** | [**AccessRequest**](AccessRequest.md)|  | 

### Return type

[**AccessRequest**](AccessRequest.md)


## deleteRecord

> deleteRecord(recordId)

Delete access record

Remove an access record, removing associated permissions from all users in record. If a user has a permission from another record, that permission will not be removed. (Note: This disables the record by changing the status to &lt;strong&gt;DELETED&lt;/strong&gt; but not completely remove the record for tracking purposes.

### Example

```javascript
import { AuthressClient, AccessRecord } from '@authress/sdk';

let recordId = "recordId_example"; // String | The identifier of the access record.
await new AuthressClient().accessRecords.deleteRecord(recordId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **recordId** | **String**| The identifier of the access record. | 


## deleteRequest

> deleteRequest(requestId)

Delete access request

Remove an access request.

### Example

```javascript
import { AuthressClient, AccessRecord } from '@authress/sdk';

let requestId = "requestId_example"; // String | The identifier of the access request.
await new AuthressClient().accessRecords.deleteRequest(requestId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestId** | **String**| The identifier of the access request. | 


## getRecord

> AccessRecord getRecord(recordId)

Retrieve access record

Access records contain information assigning permissions to users for resources.

### Example

```javascript
import { AuthressClient, AccessRecord } from '@authress/sdk';

let recordId = "recordId_example"; // String | The identifier of the access record.
await new AuthressClient().accessRecords.getRecord(recordId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **recordId** | **String**| The identifier of the access record. | 

### Return type

[**AccessRecord**](AccessRecord.md)


## getRecords

> AccessRecordCollection getRecords(opts)

List access records

Returns a paginated records list for the account. Only records the user has access to are returned. The results sort order is not stable, on subsequent requests different results may be returned. This query resource is meant for administrative actions only, therefore has a lower rate limit tier than user permissions related resources. Additionally, the results from a query to Access Records may be delayed up to 5 minutes.

### Example

```javascript
import { AuthressClient, AccessRecord } from '@authress/sdk';

let opts = {
  'limit': 20, // Number | Max number of results to return
  'cursor': "cursor_example", // String | Continuation cursor for paging
  'filter': "filter_example", // String | Filter to search records by. This performs an optimized search for matching on properties in the record. The results may change over time based on improvements in the API.
  'status': "status_example" // String | Filter records by their current status.
};
await new AuthressClient().accessRecords.getRecords(opts.limit, opts.cursor, opts.filter, opts.status);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Max number of results to return | [optional] [default to 20]
 **cursor** | **String**| Continuation cursor for paging | [optional] 
 **filter** | **String**| Filter to search records by. This performs an optimized search for matching on properties in the record. The results may change over time based on improvements in the API. | [optional] 
 **status** | **String**| Filter records by their current status. | [optional] 

### Return type

[**AccessRecordCollection**](AccessRecordCollection.md)


## getRequest

> AccessRequest getRequest(requestId)

Retrieve access request

Access request contain information requesting permissions for users to resources.

### Example

```javascript
import { AuthressClient, AccessRecord } from '@authress/sdk';

let requestId = "requestId_example"; // String | The identifier of the access request.
await new AuthressClient().accessRecords.getRequest(requestId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestId** | **String**| The identifier of the access request. | 

### Return type

[**AccessRequest**](AccessRequest.md)


## getRequests

> AccessRequestCollection getRequests(opts)

List access requests

Returns a paginated request list. Only requests the user has access to are returned. This query resource is meant for administrative actions only, therefore has a lower rate limit tier than user permissions related resources.

### Example

```javascript
import { AuthressClient, AccessRecord } from '@authress/sdk';

let opts = {
  'limit': 20, // Number | Max number of results to return
  'cursor': "cursor_example", // String | Continuation cursor for paging
  'status': "status_example" // String | Filter requests by their current status.
};
await new AuthressClient().accessRecords.getRequests(opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Max number of results to return | [optional] [default to 20]
 **cursor** | **String**| Continuation cursor for paging | [optional] 
 **status** | **String**| Filter requests by their current status. | [optional] 

### Return type

[**AccessRequestCollection**](AccessRequestCollection.md)


## respondToAccessRequest

> AccessRequest respondToAccessRequest(requestId, accessRequestResponse)

Approve or deny access request

Updates an access request, approving it or denying it.

### Example

```javascript
import { AuthressClient, AccessRecord, AccessRequestResponse } from '@authress/sdk';

let requestId = "requestId_example"; // String | The identifier of the access request.
await new AuthressClient().accessRecords.respondToAccessRequest(requestId, accessRequestResponse);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestId** | **String**| The identifier of the access request. | 
 **accessRequestResponse** | [**AccessRequestResponse**](AccessRequestResponse.md)|  | 

### Return type

[**AccessRequest**](AccessRequest.md)


## updateRecord

> updateRecord(recordId, accessRecord, opts)

Update access record

Updates an access record adding or removing user permissions to resources. (Records have a maximum size of ~100KB)

### Example

```javascript
import { AuthressClient, AccessRecord } from '@authress/sdk';

let recordId = "recordId_example"; // String | The identifier of the access record.
let opts = {
  expectedLastModifiedTime: new Date("2025-05-07T08:09:15.534+00:00") // Date | The expected last time the record was modified.
};
await new AuthressClient().accessRecords.updateRecord(recordId, accessRecord, opts.expectedLastModifiedTime);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **recordId** | **String**| The identifier of the access record. | 
 **accessRecord** | [**AccessRecord**](AccessRecord.md)|  | 
 **expectedLastModifiedTime** | **Date**| The expected last time the record was modified. | [optional] 

