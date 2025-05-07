# Client

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**clientId** | **String** | The unique ID of the client. | [readonly] 
**createdTime** | **Date** |  | [optional] [readonly] 
**name** | **String** | The name of the client | [optional] 
**options** | [**ClientOptions**](ClientOptions.md) |  | [optional] 
**rateLimits** | [**[ClientRateLimit]**](ClientRateLimit.md) | A list of the service client rate limits. Rate Limits can be used to prevent service clients from creating too many requests to your API. They can also limit the number of requests to Authress management APIs, or contain a maximum quota for a client before it is not longer allowed to make additional requests. | [optional] 
**verificationKeys** | [**[ClientAccessKey]**](ClientAccessKey.md) | A list of the service client access keys. | [optional] [readonly] 
**tags** | **{String: String}** | The tags associated with this resource, this property is an map. { key1: value1, key2: value2 } | [optional] 


