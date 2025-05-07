<p align="center">
  <img src="https://authress.io/static/images/linkedin-banner.png" alt="Authress media banner">
</p>

# Authress SDK for Javascript/Typescript

<p align="center">
    <a href="https://www.npmjs.com/package/@authress/sdk" alt="Authress SDK on npm"><img src="https://badge.fury.io/js/@authress%2Fsdk.svg"></a>
    <a href="https://github.com/Authress/authress-sdk.js/actions/workflows/build.yml" alt="Build status"><img src="https://github.com/Authress/authress-sdk.js/actions/workflows/build.yml/badge.svg"></a>
    <a href="https://github.com/Authress/authress-sdk.js/blob/main/LICENSE" alt="Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"></a>
    <a href="https://authress.io/community" alt="authress community"><img src="https://img.shields.io/badge/Community-Authress-fbaf0b.svg"></a>
</p>

This is the Authress SDK used to integrate with the authorization as a service provider Authress at https://authress.io.


## Usage

```sh
npm install @authress/sdk
```

Then required the package:
```js
import { AuthressClient } from '@authress/sdk';
```

## Getting Started

### Reference Guide

See the SDK reference guide for a examples of commonly executed blocks with descriptions.

<!-- Use absolute links, to support this link working from PackageManager-->
[SDK Documentation](https://github.com/Authress/authress-sdk.js/blob/main/docs/README.md)


### Method Documentation

<!-- Use absolute links, to support this link working from PackageManager-->
[Authorize using a user token](https://github.com/Authress/authress-sdk.js/blob/main/docs/methods.md#authorize-using-a-user-token)
[Authorize with a service client](https://github.com/Authress/authress-sdk.js/blob/main/docs/methods.md#authorize-with-a-service-client)
[Creating resources](https://github.com/Authress/authress-sdk.js/blob/main/docs/methods.md#creating-resources)
[Verifying a token using the token verifier](https://github.com/Authress/authress-sdk.js/blob/main/docs/methods.md#verifying-a-token-using-the-token-verifier)
[Make direct API requests](https://github.com/Authress/authress-sdk.js/blob/main/docs/methods.md#make-direct-api-requests)
[Paginating through a collection resource](https://github.com/Authress/authress-sdk.js/blob/main/docs/methods.md#paginating-through-a-collection-resource)

### Frequently Asked Questions
* Where do I get a user ID from?

Every JWT contains a user ID, and you can pull it out from there using the `TokenVerifier` import or `verifyToken` method. For more details see [Authress JWT access tokens](https://authress.io/knowledge-base/docs/authentication/validating-jwts#authress-user-ids-and-a-jwt-access-token-example).

### Framework Examples
See all the available [Authress Starter Kits](https://github.com/search?q=org%3AAuthress+starter-kit&type=repositories)

* [Express](https://github.com/Authress/express-starter-kit)
* [All other frameworks](https://github.com/search?q=org%3AAuthress+starter-kit&type=repositories)

## Contributions

<!-- Use absolute links, to support this link working from PackageManager-->

[Developing for the Javascript SDK](https://github.com/Authress/authress-sdk.js/blob/main/contributing.md)
