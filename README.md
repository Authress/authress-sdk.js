# authress-sdk.js
The Authress SDK in javascript

[![npm version](https://badge.fury.io/js/authress-sdk.svg)](https://badge.fury.io/js/authress-sdk)
[![Build Status](https://travis-ci.com/authress/authress-sdk.js.svg?branch=master)](https://travis-ci.com/authress/authress-sdk.js)


# authress-sdk
Authress SDK for Python.

[![NuGet version](https://badge.fury.io/py/authress-sdk.svg)](https://badge.fury.io/py/authress-sdk) [![Build Status](https://travis-ci.com/authress/authress-sdk.py.svg?branch=master)](https://travis-ci.com/authress/authress-sdk.py)

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

### Authorize using a user token
```js
const { AuthressClient } = require('authress-sdk');

// create an instance of the API class during service initialization
// Replace DOMAIN with the Authress domain for your account
const authressClient = new AuthressClient({ baseUrl: 'https://DOMAIN.api-REGION.authress.io' })

// on api route
[route('/resources/<resourceId>')]
function getResource(resourceId) {
  // Get the user token and pass it to authress
  const authorizationToken = request.headers.get('authorization');
  authressClient.setToken(authorizationToken);

  // Check Authress to authorize the user
  try {
    client.userPermissions.authorizeUser(userId, `resources/${resourceId}`, 'READ');
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

### Authorize with a service client
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
    client.userPermissions.authorizeUser(userId, `resources/${resourceId}`, 'READ');
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
