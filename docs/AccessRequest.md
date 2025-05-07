# AccessRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requestId** | **String** | Unique identifier for the request. | [readonly] 
**lastUpdated** | **Date** | The expected last time the request was updated | [optional] [readonly] 
**status** | **String** | Current status of the access request. | [optional] [readonly] 
**access** | [**AccessTemplate**](AccessTemplate.md) |  | 
**links** | [**AccountLinks**](AccountLinks.md) |  | [optional] 
**tags** | **{String: String}** | The tags associated with this resource, this property is an map. { key1: value1, key2: value2 } | [optional] 



## Enum: StatusEnum


* `OPEN` (value: `"OPEN"`)

* `APPROVED` (value: `"APPROVED"`)

* `DENIED` (value: `"DENIED"`)

* `DELETED` (value: `"DELETED"`)




