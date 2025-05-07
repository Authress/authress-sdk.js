# Connection

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** |  | [optional] [default to &#39;OAUTH2&#39;]
**connectionId** | **String** |  | [optional] 
**authenticationUrl** | **String** | Authorization URL of the provider (where the user logs in). For OAuth this is the authorization URL. For SAML, specify the **SSO URL** in this property. | [optional] 
**tokenUrl** | **String** | The token exchange url (where we validate the token). | [optional] 
**issuerUrl** | **String** | The unique identifier tied to the provider&#39;s domain used for TLS verification. In OAuth, this is the JWT **iss** property. For SAML, specify the **Entity ID** in this property. | [optional] 
**providerCertificate** | **String** | The Provider&#39;s SAML public certificate which can be used to verify the signature in signed SAML assertions from the provider. | [optional] 
**clientId** | **String** | Provider&#39;s client ID used to verify the token | [optional] 
**clientSecretId** | **String** | Provider&#39;s client secret identifier used to identify the client secret within your account. Some provider require this property. | [optional] 
**clientSecret** | **String** | Provider&#39;s client secret used to verify the token | [optional] 
**userDataConfiguration** | [**ConnectionUserDataConfiguration**](ConnectionUserDataConfiguration.md) |  | [optional] 
**data** | [**ConnectionData**](ConnectionData.md) |  | [optional] 
**defaultConnectionProperties** | [**ConnectionDefaultConnectionProperties**](ConnectionDefaultConnectionProperties.md) |  | [optional] 
**conditions** | [**ConnectionConditions**](ConnectionConditions.md) |  | [optional] 
**tenantConfiguration** | [**ConnectionTenantConfiguration**](ConnectionTenantConfiguration.md) |  | [optional] 
**linkingConfiguration** | [**ConnectionLinkingConfiguration**](ConnectionLinkingConfiguration.md) |  | [optional] 
**createdTime** | **Date** |  | [optional] [readonly] 
**lastUpdated** | **Date** |  | [optional] [readonly] 
**isActiveConnection** | **Boolean** |  | [optional] [readonly] 
**tags** | **{String: String}** | The tags associated with this resource, this property is an map. { key1: value1, key2: value2 } | [optional] 



## Enum: TypeEnum


* `OAUTH2` (value: `"OAUTH2"`)

* `SAML2` (value: `"SAML2"`)

* `WebAuthN` (value: `"WebAuthN"`)

* `PASSWORD` (value: `"PASSWORD"`)

* `OPENID-LEGACY` (value: `"OPENID-LEGACY"`)




