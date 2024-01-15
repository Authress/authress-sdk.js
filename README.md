# authress-sdk.js
This is the Authress SDK used to integrate with the authorization as a service provider Authress at https://authress.io.

[![npm version](https://badge.fury.io/js/@authress%2Fsdk.svg)](https://www.npmjs.com/package/@authress/sdk)


## Usage

```sh
npm install @authress/sdk
```

Then required the package:
```js
const { AuthressClient } = require('@authress/sdk');
```

## Getting Started

### Frequently Asked Questions
* Where do I get a user ID from?

Every JWT contains a user ID, and you can pull it out from there using the `TokenVerifier` import or `verifyToken` method. For more details see [Authress JWT access tokens](https://authress.io/knowledge-base/docs/authentication/validating-jwts#authress-user-ids-and-a-jwt-access-token-example).

### Method Documentation

[SDK examples](./docs/methods.md)

### Framework Examples
See all the available [Authress Starter Kits](https://github.com/search?q=org%3AAuthress+starter-kit&type=repositories)

* [Express](https://github.com/Authress/express-starter-kit)
* [All other frameworks](https://github.com/search?q=org%3AAuthress+starter-kit&type=repositories)

## Contributions

### Adding new DTO and methods
Auto generate the new code using this openapi generator, and merge the files into the appropriate locations:
```bash
curl -XPOST https://generator3.swagger.io/api/generate -H 'content-type: application/json' -d '{"specURL" : "https://api.authress.io/.well-known/openapi.json","lang" : "typescript-fetch","type" : "CLIENT","codegenVersion" : "V3"}'  --output generated_sdk.tar.gz

```
