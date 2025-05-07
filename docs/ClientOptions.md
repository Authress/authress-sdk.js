# ClientOptions

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**grantUserPermissionsAccess** | **Boolean** | Grant the client access to verify authorization on behalf of any user. | [optional] [default to false]
**grantTokenGeneration** | **Boolean** | Grant the client access to generate oauth tokens on behalf of the Authress account. **Security Warning**: This means that this client can impersonate any user, and should only be used when connecting an existing custom Authorization Server to Authress, when that server does not support a standard OAuth connection. | [optional] [default to false]


