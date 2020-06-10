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
const jwtManager = require('jsonwebtoken');
const { AuthressClient, ServiceClientTokenProvider, UnauthorizedError } = require('authress-sdk');

// Some requests to authress request service client access and cannot use the user's JWT
// IMPORTANT: These should be replace with account specific values
const serviceClientAccessKey = 'eyJrZXlJZCI6IjRkZmM0MDJiLTZmOGUtNGZhNy1iYzM3LWZhMzFlMTVhNmRkYyIsInByaXZhdGVLZXkiOiItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2QUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktZd2dnU2lBZ0VBQW9JQkFRQ3IzcUkzSnBQN2tGRHZcbjFnVUl0c2x3V21EV01UbGk3VlRJZEJWNEN2VFpxZHNPNnNWMDFFc1RoOEJBM25QUjJZaUF2UEFuTTlnUTh4bUNcbjZpMzc4eHJUd2RrcS8rU0o5c3ByVkZVeVZxQ0JqKzRSUG1yNllpREgrMFV5Nm10eEI2MzcyaE13Vis0cDAxbDdcbjZSZnRDdWIrVmFOTUxGVTFObWhZRjZFUDNLN1IveklxbHNTemxTWUcwRWprd1ltZjY5RVN0Y2VUcXVkS2tnbGhcbkR3TG5QOGwvWFlCbnV4RDVDQkpXU0tBM0pKaEs0MDhyb2w0U2JpQjZPWFI1Z05ZbCtHakp6ZUt6dkVSUkN6anNcbjE0aUk0NXR0Ty9TaVF1NVJKbThrTDY1ZGc3dUp2dEYrejhZemZpaEtsaGdNSHkwTFVRTXNYZ3ZzVmN1QjhMYUdcbm11bDlZZU9KQWdNQkFBRUNnZ0VBSHc3ZFc0QUNMK3lWWTdIV09Rdm0vUUdvREN6YkJQQ0VhTERwakViV2xscm1cbmRoeWcwQXJwQWo5KzAzb2ZqZVYwa0djVU10RmdremVLL2FoWjVQUzZmVmZEYWN6U1BNZzNMZ3dRVlVkb08rR0pcbmtONHBzTk40dndxK0o0UkxKQ0xTSXZmMmpiN21EL0xjY2RMZWV2eUVYNk9VSGRqSkVST2k2WUJqbjUwdWprMzJcbmx3MEtHOTl2WnRWWmRPY3l6QTYrZG5xMUxWcEtXTEtNeG1uSWVwd2psN3BhbDIzNUI1MnE2dUZQUGZsN1FHS2NcbkN5bEZ3Q1JDZmM2VGV3anRpcVc3SzZkd1ZKSFkwcWFGcDdzZytkbXlGRlRXWmZuaTFkS1UyaTdhdng4a09BTjNcbk00N2szdDZySkJWQ2NHbnNrQzJ5eVpHVHhNNlVKY3lxZVd3Z3QwUUJBUUtCZ1FEY3VLVWFRRnR0Y1FCb05aQ1RcbkowUDVVQjhweGNtVFVwOTZGdTVjd0VPc0xtU2tLTkR3OXN0bWc2Q2N3R3Y1cDMwMjM2S0w4VGNkZmlMZFJwdlZcbjNsSjBCbzE4dWFoUnNlM2ZBM05yNGxWZ0RBakZLQkxuenZHK2FKUWJjdFJCdE5HZk9aOGEyN3grQ254L2JNaEpcbkF0VlgwRFBEcER2K2YvaGNLeFFSeU9VUDRRS0JnUURIVnhyUnl4cmViZVJ6TVcrYzQzTUYrSGxFNVUxT29TNjZcbmxtWWFvaGpXaHJ1TXo2VGc2NHZ0RWZjUHBpeXhpSjZSa1lLT29wdmhhZFQ2dWxxbE10ais2Zmw1NHBsVkhaVlFcbmNEY3pMTklRbjFPWUNlSzFZN2ZTS0EvdlpDQ2JnWi92aE9RTmE1d3VzcWdxUEY5emhOWEpyb1BKbWt5cUlmZFBcbk9TcG9zcGRvcVFLQmdEMzRHV0tsYndYckZCSXQ5OGxZM056Q2dmMVlhcC9TTXJRMGUvZk9nekYwVlExQjZHZStcbjRweUZtREpxVStaai8rUElKZnJrWG5VSlZRQ0xNblY1VmV6OWFmdjZwQ2RMclYxUHVyZ3ZjNGpqMkJLQ2pjeEhcbmJkZm54SzF3TCtmQ3ZKZlh0YlAwdlpjbG1vNnNIQTlqbkVKclVoMDdueHgxRVdYUE1uTkwxQVFCQW9HQVRWY0RcblJkQktiWEF2aVczdHd1NFFTNG02NnpzWUFtRFE4MzIwd2JLUWRuTXh3eEV4QkQ3L1BBeVRVWlFFbFNEUGZPVDZcbnhZSmJmbHFFVW44SStqMC9LYS8zcGcxL3RpRlROREZGaVdwaldpV20xajlIb1Y2K0RDQ1ZCaWxQNldXaWV0aVJcbmJvK0l1aW1BeTFvL0lsK3dYcDZCN1M4YmZZck9IQU91NjQ0VzVua0NnWUJ2WkdJTGRhQWkzYXRoenR0TVJaeFdcbm1oaXYyeXRRU2NIWTlMcVJCMGRYazZOUTkrMEU1MjdraG14Y3dCT1E2UDhrM0RnLyttQTlHWDFyOG15Z3JRTlZcbk9Gb2N2YW90Q2ZyZmdmZTZtRlI1Wm1PM3VRajZIWG42ZGJ3d2srcFEyVTYzMTA4eFRJb0hLd2prQ2xpdWFkTW5cbnFhN2dPUHFZMVA0RHZ2Y2NMSkswQ0E9PVxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwiYXVkaWVuY2UiOiIxMWZmZTk4ZC0xN2ZiLTRlYzktYTVhMi0xYmEyOGZmMmZlMmMuYWNjb3VudHMuYXV0aHJlc3MuaW8iLCJjbGllbnRJZCI6ImU5YWEwMGE4LWE4MzUtNGY4Zi04MzI1LWNiYmEyODUyOGUyMCJ9';
const authressDomain = 'https://DOMAIN.api-REGION.authress.io';
const authressServiceClient = new AuthressClient({ baseUrl: authressDomain }, new ServiceClientTokenProvider(serviceClientAccessKey));

api.use((request, response, next) => {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) {
    response.status(401).send({});
    return;
  }
  const token = authorizationHeader.replace(/Bearer\s+/i, '').trim();
  const jwt = jwtManager.decode(token);
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
    await authressServiceClient.createRecord({
      name: `Access To New Resource ${newSubResourceId}`,
      // Optional admin if they should be allowed to edit this record
      // admin: [{ userId: requestUserId }],
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
