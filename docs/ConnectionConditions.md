# ConnectionConditions

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requireBusinessAccount** | **Boolean** | Require the user logging in with this connect to be using a business account. When possible Authress will block user login and request that they select a different account. Enabling this may prevent some users from being able to sign up with this identity connection. | [optional] [default to false]
**authenticationLeewayDuration** | **String** | The maximum amount of time to wait between the the instant a user begins the authentication flow, to the moment login has completed. Lower values increase security by limiting attack time, longer times allow for slower connections and async login flows to complete. Authentication requests that do not complete within this duration are rejected with the Expired error. The default is 5 minutes. The minimum is one minute and the max is 1 hour. | [optional] [default to &#39;PT5M&#39;]


