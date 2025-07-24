# Application

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**applicationId** | **String** | The unique identifier for the application. Always prefixed with app_. | 
**name** | **String** | The name of this application when displayed in the Authress management portal | 
**redirectUrls** | **[String]** | Specify the application host urls. When authenticating users, the redirectUrl specified in the auth request must match one of these. These support implied wildcards, and will match any additional subdomain, path, query, and hash. | 
**sessionType** | **String** |  | [optional] [default: &#39;MULTI_SESSION&#39;]
**createdTime** | **Date** | The ISO8601 datetime when the application was created. | 
**lastUpdated** | **Date** | The ISO8601 datetime when the application was last updated. | 
**isActiveApplication** | **Boolean** | An automatically generated property that represents whether or not this application is currently is use. Applications that still significantly used cannot be deleted. | [optional] 
**tags** | **{String: String}** | The tags associated with this resource, this property is an map. { key1: value1, key2: value2 } | 



## Enum: SessionTypeEnum


* `SINGLE_SESSION` (value: `"SINGLE_SESSION"`)

* `MULTI_SESSION` (value: `"MULTI_SESSION"`)




