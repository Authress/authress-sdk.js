# Contributing to this Python SDK

## Setup
```sh
yarn
```

## Tests

Execute `yarn test` to run the tests.

## Using the OpenAPI Generator to generate new models

#### Start container
```sh
podman pull docker://openapitools/openapi-generator-online
```

#### Start container at port 8888 and save the container id
```sh
CID=$(podman run -d -p 8888:8080 openapitools/openapi-generator-online)
sleep 10

# Execute an HTTP request to generate the client
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"openAPIUrl": "https://api.authress.io/", "options": { "useSingleRequestParameter": true, "packageName": "@authress/sdk", "packageVersion": "99.99.99" } }' 'http://localhost:8888/api/gen/clients/javascript'

# RESPONSE: { "link":"http://localhost:8888/api/gen/download/c2d483.3.4672-40e9-91df-b9ffd18d22b8" }
```

### Download the generated zip file
```sh

wget RESPONSE_LINK

# Unzip the file
unzip SHA

# Shutdown the openapi generator image
podman stop $CID && podman rm $CID
```

### Repeated actions
* Move `models`, `tests`, `docs` to the appropriate locations.

### Common review items
* [ ] Inputs to Constructor are (string: authress_api_url, string: service_client_access_key)
* [ ] authress_api_url should sanitize https:// prefix and remove trailing `/`s
* [ ] Add authentication to the configuration class.
* [ ] Change configuration class name to be `AuthressSettings`
  * Specify all the inputs to be consistent across languages
* [x] constructors for classes should only have relevant input properties, for instances `links` are not required.
* [x] Update documentation
  * Make sure markdown is valid
  * Remove unnecessary links
  * Add first class examples to readme.md + api documentation
  * Find failed UserId, RoleId, TenantId, GroupId, Action properties and convert them to strings
* [ ] Remove any unnecessary validations from object and parameter injection, often there are some even when properties are allowed to be null
* [ ] The service client code to generate a JWT from private key needs to be added
* [ ] Add UnauthorizedError type to the authorizeUser function
* [ ] GET query parameters should be an object
* [x] Top level tags from the API should accessible from the base class: `authressClient.accessRecords.getRecords(...)`
* [x] Automatic Retry
  * [x] Automatic fallback to cache
* [ ] `OptimisticPerformanceHandler` - Automatic fallback to cache on timeout reached
* [ ] In memory caching for authorization checks - memoize
* [ ] Unsigned int for all limits
* [x] readonly properties are never specified as required for request bodies
* [x] Update Documentation for the API
* [ ] Validate all enums are enums and can be null when they should be.
* [x] Remove LocalHost from the docs
* [ ] Tests
* [x] If-unmodified-since should called `expectedLastModifiedTime`, accept string or dateTime and convert this to an ISO String
* [x] Update OAuth2 openapi authentication references in the documentation
* [ ] Alias all ____Id types to be strong string (userId : UserId, TenantId, GroupId, RoleId) search for regex `:type .*_id: (?!str)`