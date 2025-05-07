# GroupsApi


Method | HTTP request | Description
------------- | ------------- | -------------
[**createGroup**](GroupsApi.md#createGroup) | **POST** /v1/groups | Create group
[**deleteGroup**](GroupsApi.md#deleteGroup) | **DELETE** /v1/groups/{groupId} | Delete group
[**getGroup**](GroupsApi.md#getGroup) | **GET** /v1/groups/{groupId} | Retrieve group
[**getGroups**](GroupsApi.md#getGroups) | **GET** /v1/groups | List groups
[**updateGroup**](GroupsApi.md#updateGroup) | **PUT** /v1/groups/{groupId} | Update a group



## createGroup

> Group createGroup(group)

Create group

Specify users to be included in a new group. (Groups have a maximum size of 100 users)

### Example

```javascript
import { AuthressClient, Group } from '@authress/sdk';
let group = new Group(); // Group | 
await new AuthressClient().groups.createGroup(group);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**Group**](Group.md)|  | 

### Return type

[**Group**](Group.md)


## deleteGroup

> deleteGroup(groupId)

Delete group

Remove a group, users will lose any role that was assigned through membership of this group. This action cannot be undone.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let groupId = "groupId_example"; // GroupId | The identifier of the group.
await new AuthressClient().groups.deleteGroup(groupId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupId** | **String**| The identifier of the group. | 


## getGroup

> Group getGroup(groupId)

Retrieve group

A group contains multiple users which can be added to an access record, and should be assigned the same roles at the same time.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let groupId = "groupId_example"; // GroupId | The identifier of the group.
await new AuthressClient().groups.getGroup(groupId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupId** | **String**| The identifier of the group. | 

### Return type

[**Group**](Group.md)


## getGroups

> GroupCollection getGroups(opts)

List groups

Returns a paginated groups list for the account. Only groups the user has access to are returned. The results sort order is not stable, on subsequent requests different results may be returned. This query resource is meant for administrative actions only, therefore has a lower rate limit tier than user permissions related resources. Additionally, the results from a query to Groups may be delayed up to 5 minutes.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let opts = {
  'limit': 20, // Number | Max number of results to return
  'cursor': "cursor_example", // String | Continuation cursor for paging
  'filter': "filter_example" // String | Filter to search groups by. This performs an optimized search for matching on properties in the group. The results may change over time based on improvements in the API.
};
await new AuthressClient().groups.getGroups(opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **Number**| Max number of results to return | [optional] [default to 20]
 **cursor** | **String**| Continuation cursor for paging | [optional] 
 **filter** | **String**| Filter to search groups by. This performs an optimized search for matching on properties in the group. The results may change over time based on improvements in the API. | [optional] 

### Return type

[**GroupCollection**](GroupCollection.md)


## updateGroup

> Group updateGroup(groupId, group, opts)

Update a group

Updates a group adding or removing user. Change a group updates the permissions and roles the users have access to. (Groups have a maximum size of ~100KB)

### Example

```javascript
import { AuthressClient, Group } from '@authress/sdk';
let groupId = "groupId_example"; // GroupId | The identifier of the group.
let group = new Group(); // Group | 
let opts = {
  'expectedLastModifiedTime': new Date("2025-05-07T08:09:15.533+00:00") // Date | The expected last time the group was modified.
};
await new AuthressClient().groups.updateGroup(groupId, group, opts);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupId** | **String**| The identifier of the group. | 
 **group** | [**Group**](Group.md)|  | 
 **expectedLastModifiedTime** | **Date**| The expected last time the group was modified. | [optional] 

### Return type

[**Group**](Group.md)

