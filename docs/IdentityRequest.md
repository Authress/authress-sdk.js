# IdentityRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**jwt** | **String** | A valid JWT OIDC compliant token which will still pass authentication requests to the identity provider. Must contain a unique audience and issuer. | [optional] 
**issuer** | **String** | The issuer of the OAuth OIDC provider&#39;s JWTs. This value should match the &#x60;iss&#x60; claim in the provided tokens exactly. | [optional] 
**preferredAudience** | **String** | If the &#x60;jwt&#x60; token contains more than one valid audience, then the single audience that should associated with Authress. If more than one audience is preferred, repeat this call with each one. | [optional] [default: &#39;*&#39;]
**userIdExpression** | **String** | By default, the **sub** claim of the JWT is used to identify the user from this provider. To use an alternate claim or a compound userId resolution, specify an expression. The resolved userId must be the same one that is later used in Authress access records. | [optional] [default: &#39;{sub}&#39;]


