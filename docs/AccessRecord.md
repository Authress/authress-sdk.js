# AccessRecord

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**recordId** | **String** | Unique identifier for the record, can be specified on record creation. | [optional] 
**name** | **String** | A helpful name for this record | 
**description** | **String** | More details about this record | [optional] 
**capacity** | **Number** | Percentage capacity of record that is filled. | [optional] [readonly] 
**lastUpdated** | **Date** | The expected last time the record was updated | [optional] [readonly] 
**status** | **String** | Current status of the access record. | [optional] [readonly] 
**account** | [**AccessRecordAccount**](AccessRecordAccount.md) |  | [optional] 
**users** | [**[User]**](User.md) | The list of users this record applies to. The record is finite in size, for patterns where the list of users might grow indefinitely, the recommended solution is to specify each user in their own access record. | [optional] 
**admins** | [**[User]**](User.md) | The list of admin that can edit this record even if they do not have global record edit permissions. | [optional] 
**groups** | [**[LinkedGroup]**](LinkedGroup.md) | The list of groups this record applies to. Users in these groups will be receive access to the resources listed. | [optional] 
**statements** | [**[Statement]**](Statement.md) | A list of statements which match roles to resources. | 
**links** | [**AccountLinks**](AccountLinks.md) |  | [optional] 
**tags** | **{String: String}** | The tags associated with this resource, this property is an map. { key1: value1, key2: value2 } | [optional] 



## Enum: StatusEnum


* `ACTIVE` (value: `"ACTIVE"`)

* `DELETED` (value: `"DELETED"`)




