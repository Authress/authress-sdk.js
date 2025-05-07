# InvitesApi


Method | HTTP request | Description
------------- | ------------- | -------------
[**createInvite**](InvitesApi.md#createInvite) | **POST** /v1/invites | Create user invite
[**deleteInvite**](InvitesApi.md#deleteInvite) | **DELETE** /v1/invites/{inviteId} | Delete invite
[**getInvite**](InvitesApi.md#getInvite) | **GET** /v1/invites/{inviteId} | Retrieve invite
[**respondToInvite**](InvitesApi.md#respondToInvite) | **PATCH** /v1/invites/{inviteId} | Accept invite



## createInvite

> Invite createInvite(invite)

Create user invite

Invites are used to easily assign permissions to users that have not been created in your identity provider yet. 1. This generates an invite record. 2. Send the invite ID to the user. 3. Log the user in. 4. As the user PATCH the /invite/{inviteId} endpoint 5. This accepts the invite.         When the user accepts the invite they will automatically receive the permissions assigned in the Invite. Invites automatically expire after 7 days.

### Example

```javascript
import { AuthressClient, Invite } from '@authress/sdk';
let invite = new Invite(); // Invite | 
await new AuthressClient().invites.createInvite(invite);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invite** | [**Invite**](Invite.md)|  | 

### Return type

[**Invite**](Invite.md)


## deleteInvite

> deleteInvite(inviteId)

Delete invite

Deletes an invite.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let inviteId = "inviteId_example"; // String | The identifier of the invite.
await new AuthressClient().invites.deleteInvite(inviteId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inviteId** | **String**| The identifier of the invite. | 


## getInvite

> Invite getInvite(inviteId)

Retrieve invite

Gets the invite along with the relevant invite data. Invites enable users inviting other users to their tenant, organization, or account.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let inviteId = "inviteId_example"; // String | The identifier of the invite.
await new AuthressClient().invites.getInvite(inviteId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inviteId** | **String**| The identifier of the invite. | 

### Return type

[**Invite**](Invite.md)


## respondToInvite

> respondToInvite(inviteId)

Accept invite

Accepts an invite by claiming this invite by this user. The user identified by the access token in the request will gain the permissions associated with the invite.&lt;br&gt;&lt;br&gt;This endpoint is unnecessary when using Authress for Login. Instead, in the Authress Login UI SDK, then pass the invite ID to the SDK, and the SDK will automatically accept the invite. Additionally, calling this endpoint will ignore any value specified in the invite &lt;code&gt;defaultLoginTenantId&lt;/code&gt; parameter.

### Example

```javascript
import { AuthressClient } from '@authress/sdk';
let inviteId = "inviteId_example"; // String | The identifier of the invite.
await new AuthressClient().invites.respondToInvite(inviteId);
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inviteId** | **String**| The identifier of the invite. | 

