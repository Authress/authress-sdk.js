# Change log
This is the changelog for [Authress SDK](readme.md).

## 1.2 ##
* Removed legacy support for RS512 service client tokens.
* Add EdDSA support for `tokenVerifier()` class

## 1.1 ##
* Migrated to Github Actions

## 1.0 ##
* Allow key format to be base64 or unencoded
* Added `getUserRolesForResource` for access to user roles on a resource.
* Add `Last-Modified` and `If-Unmodified-Since` support to access record updates.
* Add `Groups` to `AccessRecords`
* Add `ConnectionsApi` to fetch user credentials for a specific connection
