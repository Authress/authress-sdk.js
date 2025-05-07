# Identity

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**issuer** | **String** | The issuer of the JWT token. This can be any OIDC compliant provider. | 
**audience** | **String** | The audience of the JWT token. This can be either an audience for your entire app, or one particular audience for it. If there is more than one audience, multiple identities can be created. | 
**userIdExpression** | **String** | By default, the **sub** claim of the JWT is used to identify the user from this provider. To use an alternate claim or a compound userId resolution, specify an expression. The resolved userId must be the same one that is later used in Authress access records. | [optional] [default to &#39;{sub}&#39;]


