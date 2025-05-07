# ApplicationRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | The name of this application when displayed in the Authress management portal | 
**redirectUrls** | **[String]** | Specify the application host urls. When authenticating users, the redirectUrl specified in the auth request must match one of these. These support implied wildcards, and will match any additional subdomain, path, query, and hash. | 
**sessionType** | **String** |  | [optional] [default to &#39;MULTI_SESSION&#39;]
**tags** | **{String: String}** | The tags associated with this resource, this property is an map. { key1: value1, key2: value2 } | [optional] 



## Enum: SessionTypeEnum


* `SINGLE_SESSION` (value: `"SINGLE_SESSION"`)

* `MULTI_SESSION` (value: `"MULTI_SESSION"`)




