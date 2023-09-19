## Commonly used functionality

[All available SDK methods](../index.d.ts)

### Authorize using a user token
```js
const { AuthressClient } = require('authress-sdk');

// What is my authressApiUrl? => API Host: https://authress.io/app/#/api?route=overview
const authressClient = new AuthressClient({ authressApiUrl: 'https://login.company.com' });

// on api route
[route('/resources/<resourceId>')]
async function getResource(resourceId) {
  // Get the user token and pass it to authress
  const authorizationToken = request.headers.get('authorization');
  authressClient.setToken(authorizationToken);

  // Check Authress to authorize the user
  try {
    await authressClient.userPermissions.authorizeUser(userId, `resources/${resourceId}`, 'READ');
  } catch (error) {
    // Will throw except if the user is not authorized to read the resource
    if (error.code === 'UnauthorizedError') {
      return 404;
    }
    throw error;
  }

  // On success, continue with the route code to load resource and return it
  return { resource: {}, statusCode: 200 };
}
```

### Authorize with a service client
```js
const { AuthressClient } = require('authress-sdk');

// create an instance of the API class during service initialization
// Replace DOMAIN with the Authress domain for your account

// Create a service client in the Authress management portal and past the access token here
// This will generate a token automatically instead of passing the user token to the api
const accessToken = 'eyJrZXlJ....';
const authressClient = new AuthressClient({ authressApiUrl: 'https://login.company.com' }, accessToken);

// on api route
[route('/resources/<resourceId>')]
async function getResource(resourceId) {
  // Check Authress to authorize the user
  try {
    await authressClient.userPermissions.authorizeUser(userId, `resources/${resourceId}`, 'READ');
  } catch (error) {
    // Will throw except if the user is not authorized to read the resource
    if (error.code === 'UnauthorizedError') {
      return 404;
    }
    throw error;
  }

  // On success, continue with the route code to load resource and return it
  return { resource: {}, statusCode: 200 };
}
```

### Creating resources
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

### Verifying a token using the token verifier
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

### Make direct API requests
Authress supports extended functionality via the REST api, in specific cases it helps to make these direct calls. Each API call requires a URL and an access token. In the case you want use the access token for the user, directly pass it as the `bearer` in the `Authorization` header:
```js
const response = await client.get(url, { 'Authorization': `Bearer: ${userAccessToken}` });
```

In the case you want to make a request using the service client's secret key, use the `serviceClientTokenProvider` you've already configured:
```js
// Standard library configuration:
const { AuthressClient, ServiceClientTokenProvider } = require('authress-sdk');
const accessToken = 'eyJrZXlJ....';
const serviceClientTokenProvider = new ServiceClientTokenProvider(accessToken);
const authressClient = new AuthressClient({ authressApiUrl: 'https://login.company.com' }, serviceClientTokenProvider);

// Get a temporary token and use it:
const temporaryServiceClientAccessToken = await serviceClientTokenProvider.getToken();
const response = await client.get(url, { 'Authorization': `Bearer: ${temporaryServiceClientAccessToken}` });
```

### Paginating through a collection resource
Some of the resources in the API are paginated. These resources contain a `pagination.next.cursor` property when there is a next page. The cursor can be passed to query to fetch the next page. Here's an example usage:

```js
const { AuthressClient } = require('authress-sdk');
const authressClient = new AuthressClient({ authressApiUrl: 'https://login.company.com' })

// on api route
async function (resourceId) {
  // Get the user token and pass it to authress
  const authorizationToken = request.headers.get('authorization');
  authressClient.setToken(authorizationToken);

  // Get the users resources
  const response = await authressClient.userPermissions.getUserResources(userId, `resources/*`, 10, null, 'READ');
  for (const resource of response.data.resources) {
    // Iterate on resource
  }

  // Get the next page:
  const nextPageResponse = await authressClient.userPermissions.getUserResources(userId, `resources/*`, 10, response.data.pagination.next.cursor, 'READ');
  for (const resource of nextPageResponse.data.resources) {
    // Iterate on resource
  }

  // Get all the next pages:
  let cursor = response.data.pagination?.next?.cursor;
  while (cursor) {
    const response = await authressClient.userPermissions.getUserResources(userId, `resources/*`, 10, cursor, 'READ');
    cursor = response.data.pagination?.next?.cursor;
    for (const resource of response.data.resources) {
      // Iterate on resource
    }
  }
}
```
