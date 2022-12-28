const stringify = require('json-stringify-safe');
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const normalizeHeaderCase = require('header-case-normalizer');

/**
 * The following sections are just express boiler plate and can be mostly ignored.
 */
const app = express();
const api = express.Router();
app.use('/', api);

app.use((request, response, next) => {
  // add normalized headers for ease of use
  Object.keys(request.headers).map(key => {
    request.headers[normalizeHeaderCase(key)] = request.headers[key];
  });

  // Set CORS headers in response
  response.set({
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
    'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
    'Access-Control-Allow-Origin': '*'
  });
  next();
});

// Body handling
api.use(bodyParser.text({ type: ['application/x-www-form-urlencoded', 'text/css', 'text/csv', 'text/html', 'text/plain', 'text/html'] }));
api.use(bodyParser.raw({ type: ['application/octet-stream', 'application/binary', 'image/*', 'audio/*', 'video/*', 'application/pdf', 'application/x-tar', 'application/zip'], limit: '10mb' }));
api.use(bodyParser.json({ type: '*/*', limit: '10mb' }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
api.use((error, req, res, next) => {
  console.log(stringify({ title: 'Failed to parse the body', error }));
  res.status(400).send({ title: 'Invalid body parsing, it is not a valid body object.' });
});

/********************************************************************************************* */
/********************************************************************************************* */
/********************************************************************************************* */
/** Start of Example section for integration with Authress */

/** Setup middleware */
const base64url = require('base64url');
const { AuthressClient, ServiceClientTokenProvider, UnauthorizedError } = require('authress-sdk');

// Some requests to authress request service client access and cannot use the user's JWT
// IMPORTANT: These should be replace with account specific values
const serviceClientAccessKey = 'eyJrZXlJZCI6IjRkZmM0MDJiLTZmOGUtNGZhNy1iYzM3LWZhMzFlMTVhNmRkYyIsInByaXZhdGVLZXkiOiItLS0tLUJFR0lOIFBSSVZBVE';
const authressDomain = 'https://DOMAIN.api-REGION.authress.io';
const authressServiceClient = new AuthressClient({ baseUrl: authressDomain }, new ServiceClientTokenProvider(serviceClientAccessKey));

api.use((request, response, next) => {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) {
    response.status(401).send({});
    return;
  }
  const token = authorizationHeader.replace(/Bearer\s+/i, '').trim();
  const jwt = JSON.parse(base64url.decode(token.split('.')[1]));
  response.locals.userId = jwt.sub;
  // Other requests to Authress can and should be done with the user's token when possible
  response.locals.authressClient = new AuthressClient({ baseUrl: authressDomain }, () => token);

  next();
});

/** Routes */
// Get a resource
api.get('/v1/resources/:id', async (request, response, next) => {
  try {
    await response.locals.authressClient.userPermissions.authorizeUser(response.locals.userId, `resources/${request.params.id}`, 'READ');
    response.status(200).json({
      id: request.params.id
    });
  } catch (error) {
    next(error);
  }
});

// Create a sub resource
api.post('/v1/resources/:id/sub-resource', async (request, response, next) => {
  try {
    await response.locals.authressClient.userPermissions.authorizeUser(response.locals.userId, `resources/${request.params.id}/sub-resource`, 'CREATE');
    // Create resource in DB
    const newSubResourceId = 'new-sub-resource-1';
    await dbHandler.createResource('subResource', newSubResourceId);

    // Save the user's access to the new resource in Authress, NOTE: this uses the authressServiceClient instead of the user's specific authress client
    await authressServiceClient.accessRecords.createRecord({
      // Leave blank for Authress to generate one on the fly, or specify a value if the app intends to update and make modifications at a later point.
      recordId: 'RecordId',
      name: `Access To New Resource ${newSubResourceId}`,
      users: [{ userId: response.locals.userId }],
      statements: [{
        resources: [{ resourceUri: `Resources/${newSubResourceId}` }],
        // Owner by default gives full control over this new resource, including the ability to grant others access as well.
        roles: ['Authress:Owner']
      }]
    });

    response.status(200).json({
      id: request.params.id
    });
  } catch (error) {
    next(error);
  }
});

// Catch bad requests
api.use((error, req, res, next) => {
  if (error instanceof UnauthorizedError) {
    return res.status(403).json({ error: 'User does not have access to resource', userId: error.userId, resourceUri: error.resourceUri, permission: error.permission });
  }
  return next(error);
});

/** End of Example section for integration with Authress */
/********************************************************************************************* */
/********************************************************************************************* */
/********************************************************************************************* */

/** Here and below continues the boiler plat which is mostly unnecessary. It is added to make it easier to debug issues with the example. */
// Default fall back handling
api.options(/.*/, (req, res) => {
  res.status(200).json({});
});

api.all(/.*/, (req, res) => {
  res.status(404).json({
    statusCode: 404,
    title: `Resource not found at ${req.originalUrl}`
  });
});

/** Global Error handler */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
api.use((error, req, res, next) => {
  console.error(`Catch-all Error: ${error.stack || error} - ${stringify(error, null, 2)}`);
  res.status(500).json({
    statusCode: 500,
    title: 'Catch-all Error',
    detail: error.stack || error.toString()
  });
});

const httpServer = http.createServer(app);
httpServer.setTimeout(60 * 1000);
const port = 8080;
httpServer.listen(port, () => {
  console.log(`App Running on http://localhost:${port}`);
});
