# ConnectionData

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**developerAccountId** | **String** | The Developer Account ID associated with the credentials. This is necessary for some providers, such as Apple Login. | [optional] 
**name** | **String** | The name of this connection when displayed in the Authress management portal | [optional] 
**supportedContentType** | **String** | URL encode OAuth token parameters - Some authentication APIs don&#39;t support JSON, in these cases enable the url encoded form data parameters. | [optional] [default to &#39;application/json&#39;]
**oidcUserEndpointUrl** | **String** | By default, the **sub** claim of the JWT is used to identify the user from this provider. However, not all providers are OpenID compliant. Here you can provide an optional user data endpoint to fetch additional user profile information and an expression to identify a new user ID from available properties. | [optional] 
**userIdExpression** | **String** | By default, the **sub** claim of the JWT is used to identify the user from this provider. However, not all providers are OpenID compliant. Here you can provide an optional user expression to identify a new user ID from available properties found from the oidcUserEndpointUrl. (The default is **{sub}**, any claims may be used.) | [optional] [default to &#39;{sub}&#39;]
**trustIdentityUserId** | **Boolean** | Authress generates unique user IDs for every user, however if you trust your identity provider to handle unique ID generate across **ALL customers**, then it is safe to reuse the user ID from the provider. | [optional] [default to false]



## Enum: SupportedContentTypeEnum


* `application/json` (value: `"application/json"`)

* `application/x-www-form-urlencoded` (value: `"application/x-www-form-urlencoded"`)




