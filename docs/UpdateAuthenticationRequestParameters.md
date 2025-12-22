# UpdateAuthenticationRequestParameters

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**connectionId** | **String** | Specify which provider connection that user would like to use to log in - see https://authress.io/app/#/manage?focus=connections | [optional]
**tenantLookupIdentifier** | **String** | Instead of connectionId, specify the tenant lookup identifier to log the user with the mapped tenant - see https://authress.io/app/#/manage?focus=tenants | [optional]
**hint** | **String** | Instead of connectionId or tenant lookup identifier, specify the user's domain or the full email for the user to dynamically identify and log the user with the mapped tenant. | [optional]
**inviteId** | **String** | Invite to use to login, only one of the connectionId, tenantLookupIdentifier, or the inviteId is required. | [optional]
**connectionProperties** | [**ConnectionDefaultConnectionProperties**](ConnectionDefaultConnectionProperties.md) | Overrides the connection specific properties from the Authress Identity Connection to pass to the identity provider | [optional]