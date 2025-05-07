# ConnectionLinkingConfiguration

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | Specify the type of linking supported by this connection. The default configuration is DISABLED, meaning that users cannot link their identity from one connection to another connection. Both connections must allow for linking for a link to be successful. By default linking is disabled because it comes with security implications, users can potentially use linking through malicious connections to steal identities from other users.&lt;br&gt;&lt;ul&gt;&lt;li&gt;EXPLICIT - Users can use the linking API to link accounts.&lt;/li&gt;&lt;li&gt;AUTOMATIC - When a user signs up with a new account, if the verified email address matches an existing account, the two accounts will be automatically linked.&lt;/li&gt;&lt;li&gt;Set to &lt;code&gt;null&lt;/code&gt; or leave unspecified to disable identity linking.&lt;/li&gt;&lt;/ul&gt; | [optional] 



## Enum: TypeEnum


* `EXPLICIT` (value: `"EXPLICIT"`)

* `AUTOMATIC` (value: `"AUTOMATIC"`)




