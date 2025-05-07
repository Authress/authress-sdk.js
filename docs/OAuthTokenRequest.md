# OAuthTokenRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**clientId** | **String** | The client identifier to constrain the token to. | 
**clientSecret** | **String** | The secret associated with the client that authorizes the generation of token it&#39;s behalf. (Either the &#x60;client_secret&#x60; or the &#x60;code_verifier&#x60; is required) | [optional] 
**codeVerifier** | **String** | The code verifier is the the value used in the generation of the OAuth authorization request &#x60;code_challenge&#x60; property. (Either the &#x60;client_secret&#x60; or the &#x60;code_verifier&#x60; is required) | [optional] 
**grantType** | **String** | A suggestion to the token generation which type of credentials are being provided. | [optional] 
**username** | **String** | When using the user password grant_type, specify the username. Authress recommends this should always be an email address. | [optional] 
**password** | **String** | When using the user password grant_type, specify the user&#39;s password. | [optional] 
**loginType** | **String** | Enables additional configuration of the grant_type. In the case of user password grant_type, set this to **signup**, to enable the creation of users. Set this to **update**, force update the password associated with the user. | [optional] 



## Enum: GrantTypeEnum


* `client_credentials` (value: `"client_credentials"`)

* `authorization_code` (value: `"authorization_code"`)

* `password` (value: `"password"`)





## Enum: LoginTypeEnum


* `signup` (value: `"signup"`)

* `update` (value: `"update"`)




