# Invite

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**inviteId** | **String** | The unique identifier for the invite. Use this ID to accept the invite. This parameter is ignored during invite creation. | [readonly] 
**authenticationRequestUri** | **String** | Provided by Authress as a unique URI that can be used to start the Authress Login flow for the user. Provide this property in the &#x60;request_uri&#x60; property, when not using the Authress Login UI SDK. | [optional] [readonly] 
**linkedUserId** | **String** | Specify a User ID the user should receive when login completes. This ID is used to automatically assign a user ID to the user rather than a dynamically generated Authress User ID when using the Authress Login UI SDK. This parameter is ignored when accepting invites directly. Note: If the user logging in has already signed up, then this parameter is ignored. | [optional]
**defaultLoginTenantId** | **String** | Specify the tenant associated with the invite. This tenant Id is used to automatically select the tenant during login with Authress when using the Authress Login UI SDK. This parameter is ignored when accepting invites directly. To explicitly add a user to a tenant use the <code>linkTenantUser</code> API endpoint. | [optional] 
**statements** | [**[InviteStatement]**](InviteStatement.md) | A list of statements which match roles to resources. The invited user will all statements apply to them when the invite is accepted. | 
**conflictResolutionStrategy** | **String** | An access record will be created when the invite is accepted. If the access record already exists, and the statements in this invite can be merged safely, then the existing record will be updated. A safe merge is one in which the current user will only gain additional access to the statements defined in the invite and other users will not gain additional access in any scenario. When this cannot be done safely, Authress will fallback to this parameter.&lt;br&gt;             &lt;ul&gt;               &lt;li&gt;&lt;code&gt;GENERATE_NEW_RECORD&lt;/code&gt; - (Default) Create a new access record which matches the statements in this invite. The record ID will be randomly generated and is unpredictable.&lt;/li&gt;               &lt;li&gt;&lt;code&gt;UNSAFE_FORCE_MERGE&lt;/code&gt; - Add the user and statements to the existing record. This will cause the user to gain all the permissions already defined in that record and will cause all the users currently in that record to gain all the additional permissions defined in the invite.&lt;/li&gt;               &lt;li&gt;&lt;code&gt;REPLACE_RECORD_DATA&lt;/code&gt; - Replace the existing access record users, roles, and resources with those specified in this invite.&lt;/li&gt;               &lt;li&gt;&lt;code&gt;SKIP_CHANGES&lt;/code&gt; - Do not replace, do not create, do not throw. Optimal for ensuring that all records have a known management strategy and successful invite acceptance is more important than the granted permissions.&lt;/li&gt;             &lt;/ul&gt; | [optional] [default: &#39;GENERATE_NEW_RECORD&#39;]
**links** | [**AccountLinks**](AccountLinks.md) |  | [optional] 



## Enum: ConflictResolutionStrategyEnum


* `GENERATE_NEW_RECORD` (value: `"GENERATE_NEW_RECORD"`)

* `UNSAFE_FORCE_MERGE` (value: `"UNSAFE_FORCE_MERGE"`)

* `SKIP_CHANGES` (value: `"SKIP_CHANGES"`)

* `REPLACE_RECORD_DATA` (value: `"REPLACE_RECORD_DATA"`)




