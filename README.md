# authress-sdk.js
This is the Authress SDK used to integrate with the authorization as a service provider Authress at https://authress.io.

[![npm version](https://badge.fury.io/js/authress-sdk.svg)](https://badge.fury.io/js/authress-sdk)


## Usage

```sh
npm install authress-sdk
```

Then required the package:
```js
const { AuthressClient } = require('authress-sdk');
```

## Getting Started

### Framework Examples
* [Express](./examples/expressMicroservice)

### Generic Javascript Example
#### Authorize using a user token
```js
const { AuthressClient } = require('authress-sdk');

// What is my baseUrl? => API Host: https://authress.io/app/#/api?route=overview
const authressClient = new AuthressClient({ baseUrl: 'https://DOMAIN.api-REGION.authress.io' })

// on api route
[route('/resources/<resourceId>')]
function getResource(resourceId) {
  // Get the user token and pass it to authress
  const authorizationToken = request.headers.get('authorization');
  authressClient.setToken(authorizationToken);

  // Check Authress to authorize the user
  try {
    authressClient.userPermissions.authorizeUser(userId, `resources/${resourceId}`, 'READ');
  } catch (error) {
    // Will throw except if the user is not authorized to read the resource
    if (error.status === 404) {
      return 404;
    }
    throw error;
  }

  // On success, continue with the route code to load resource and return it
  return { resource: {}, statusCode: 200 };
```

#### Authorize with a service client
```js
const { AuthressClient, ServiceClientTokenProvider } = require('authress-sdk');

// create an instance of the API class during service initialization
// Replace DOMAIN with the Authress domain for your account

// Create a service client in the Authress management portal and past the access token here
// This will generate a token automatically instead of passing the user token to the api
const accessToken = 'eyJrZXlJ....';
const authressClient = new AuthressClient({ baseUrl: 'https://DOMAIN.api-REGION.authress.io' }, new ServiceClientTokenProvider(accessToken));

// on api route
[route('/resources/<resourceId>')]
function getResource(resourceId) {
  // Check Authress to authorize the user
  try {
    authressClient.userPermissions.authorizeUser(userId, `resources/${resourceId}`, 'READ');
  } catch (error) {
    // Will throw except if the user is not authorized to read the resource
    if (error.status === 404) {
      return 404;
    }
    throw error;
  }

  // On success, continue with the route code to load resource and return it
  return { resource: {}, statusCode: 200 };
```

#### Creating resources
When a user creates a resource in your application, we want to ensure that they get access own that resource.

You may receive **User does not have sufficient access to grant permissions to resources** as an error along with the status code **403**. This means that the service client or user jwt does not have access to create the access record. If using a service client, go to the Authress portal and create a one time record which grants the service client `Authress:Owner` to `Resources/` so that it can manage access records for these types of resources.

```js
await authressClient.accessRecords.createRecord({
  name: `Access To New Resource ${NewResourceId}`,
  users: [{ userId: requestUserId }],
  statements: [{
    resources: [{ resourceUri: `Resources/${NewResourceId}` }],
    // Owner by default gives full control over this new resource, including the ability to grant others access as well.
    roles: ['Authress:Owner']
  }]
});
```

#### Verifying a token using the token verifier
```js
const { TokenVerifier } = require('authress-sdk');
const cookieManager = require('cookie');

try {
  // Grab authorization cookie from the request, the best way to do this will be framework specific.
  const cookies = cookieManager.parse(request.headers.cookie || '');
  const userToken = cookies.authorization || request.headers.Authorization.split(' ')[1];
  // What should my url be? => https://authress.io/app/#/setup?focus=domain
  const userIdentity = await TokenVerifier('https://login.application.com', userToken);
} catch (error) {
  console.log('User is unauthorized', error);
  return { statusCode: 401 };
}
```

## Contributions

### Adding new DTO and methods
Auto generate the new code using this openapi generator, and merge the files into the appropriate locations:
```bash
warren@palladium:~/git/authress/authress-sdk.js (release/1.2)$ curl -XPOST https://generator3.swagger.io/api/generate -H 'content-type: application/json' -d '{"specURL" : "https://api.authress.io/.well-known/openapi.json","lang" : "typescript-fetch","type" : "CLIENT","codegenVersion" : "V3"}'  --output generated_sdk.tar.gz

```
