# AuthenticationTokenConfiguration

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**accessTokenDuration** | **String** | How long should Authress generated access tokens (JWTs) last for in minutes. This controls how often tokens expiry (*exp*). The default is 24 hours. The minimum is one minute and the max is twenty-four hours. | [optional] [default to &#39;PT24H&#39;]
**sessionDuration** | **String** | How long should user authentication sessions last for in minutes. This controls how often users are forced to log in again. User sessions are optimized to provide the best user experience for your application. The default is 90 days. The minimum is one minute and the max is 90 days. | [optional] [default to &#39;P30D&#39;]


