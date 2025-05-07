# Group

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**groupId** | **String** | Unique identifier for the groupId, can be specified on record creation. Must begin with grp_. | [optional] 
**name** | **String** | A helpful name for this record | 
**lastUpdated** | **Date** | The expected last time the group was updated | [optional] [readonly] 
**users** | [**[User]**](User.md) | The list of users in this group. A group can have a maximum of 100 users. | 
**admins** | [**[User]**](User.md) | The list of admins that can edit this record even if they do not have global record edit permissions. | 
**links** | [**AccountLinks**](AccountLinks.md) |  | [optional] 
**tags** | **{String: String}** | The tags associated with this resource, this property is an map. { key1: value1, key2: value2 } | [optional] 


