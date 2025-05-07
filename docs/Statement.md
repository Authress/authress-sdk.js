# Statement

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**roles** | **[String]** |  | 
**resources** | [**[Resource]**](Resource.md) |  | 
**users** | [**[User]**](User.md) | The list of users this statement applies to. Users and groups can be set at either the statement level or the record level, but not both. | [optional] 
**groups** | [**[LinkedGroup]**](LinkedGroup.md) | The list of groups this statement applies to. Users in these groups will be receive access to the resources listed. Users and groups can be set at either the statement level or the record level, but not both. | [optional] 


