# Change log
This is the changelog for [Authress SDK](readme.md).

## 3.0 ##
* Require minimum Node version to be 18.
* [Breaking] UserId is now required in all `userPermissions` apis. This improves **Security By Default** requiring explicit check on who the user is.
* [Breaking] Removal of property `accessToAllSubResources`.
* [Breaking] `ServiceClientTokenProvider` is now a first-class Javascript Class, it cannot be used as a function.
* [Breaking] `setToken` has been removed from the interface. To set a user token, pass in a function into the AuthressClient constructor.

## 2.3 ##
* Require minimum Node version to be 16.
* Improve support for collectionConfiguration to skip `accessToAllSubResources` check when using `INCLUDE_NESTED` in the query.
* Add explicit `clientId` into the generate service token JWT.
* Support `AuthenticateResponse` from the `@authress/login` SDK.
* Automatically set the `email_verified` property to be `true` for `generateUserLoginUrl`, when the user ID is an email address.
* [Deprecate] Begin the removal of property `accessToAllSubResources` in `userPermissions.getUserResources`, recommendation: remove all references to this property.

## 2.2 ##
* Fix `Invite` to use the correct `InviteStatement` type for `Invite` statements.

## 2.0 ##
* Enable passing just the access token as a string to `AuthressClient`.
* Fix the issuer path for service client tokens to include the accountId when the custom domain is not specified. The default issuer is converted from `api.authress.io` to `accountId.api.authress.io`. if this fallback issuer domain was specified in your authorizer, upgrading this library without changing your defined issuer, which prevent future access.
* Add automatic retries to all requests.
* Fix service client token generated tokens so that they automatically get the custom domain injected in during using in the SDK.
* Fix TokenVerifier return type to be a `Promise`.
* Add the `TokenVerificationError` error and `verifyToken` method directly to the Authress Client interface.
* Add the `ApiError` error type
* Include `email`, `picture`, and `name` in `UserIdentity` ts definition.
* Add the `invites` api.

## 1.3 ##
* Add new `Pagination` type which pagination `next.cursor` to enable paging through resources.
* Add `Extensions` api
* Upgraded node to 14
* Add support for users and groups at the statement level of access records.

## 1.2 ##
* Removed legacy support for RS512 service client tokens.
* Add EdDSA support for `tokenVerifier()` class
* Set the service client authorization request type to be `oauth-authz-req+jwt`
* Handle malformed baseUrls in `httpClient`.
* Allow specifying the authress custom domain for service client machine to machine authentication.
* Add `users.getUser(userId)` api method.
* Add `connections` API to the SDK.

## 1.1 ##
* Migrated to Github Actions

## 1.0 ##
* Allow key format to be base64 or unencoded
* Added `getUserRolesForResource` for access to user roles on a resource.
* Add `Last-Modified` and `If-Unmodified-Since` support to access record updates.
* Add `Groups` to `AccessRecords`
* Add `ConnectionsApi` to fetch user credentials for a specific connection
