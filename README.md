<p align="center">
    <img src="https://github.com/Authress/authress-sdk.cs/assets/5056218/924fb776-9588-4d4a-adf7-33682fa29356" height="300px" alt="Authress Media Banner">
</p>

# authress-sdk.js

<p align="center">
    <a href="https://badge.fury.io/js/authress-sdk" alt="Authress SDK on npm"><img src="https://badge.fury.io/js/authress-sdk.svg"></a>
    <a href="./LICENSE" alt="Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"></a>
    <a href="https://authress.io/community" alt="authress community"><img src="https://img.shields.io/badge/Community-Authress-fbaf0b.svg"></a>
</p>

This is the Authress SDK used to integrate with the authorization as a service provider Authress at https://authress.io.


## Usage

```sh
npm install authress-sdk
```

Then required the package:
```js
const { AuthressClient } = require('authress-sdk');
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
