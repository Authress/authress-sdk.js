# ConnectionTenantConfiguration

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**assignmentType** | **String** | Specify the type of tenant configuration used for assigning tenants user during login. Only connections that provide reliable &lt;code&gt;email_verified&lt;/code&gt; identity properties can enable this setting.&lt;br&gt;&lt;ul&gt;&lt;li&gt;DEFAULT - A user will only be associated with a tenant, when the tenant is specified in the &lt;code&gt;loginClient.authenticate()&lt;/code&gt; flow.&lt;/li&gt;&lt;li&gt;TRUSTED_DOMAIN_FALLBACK - When no tenant is specified, also attempt to look up the tenant utilizing the email domain of the user from their identity provider.&lt;/li&gt;&lt;/ul&gt; | [optional] [default to &#39;DEFAULT&#39;]



## Enum: AssignmentTypeEnum


* `DEFAULT` (value: `"DEFAULT"`)

* `TRUSTED_DOMAIN_FALLBACK` (value: `"TRUSTED_DOMAIN_FALLBACK"`)




