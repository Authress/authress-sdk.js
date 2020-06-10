# Express Authress example
An example built specifically for using Authress with Express.

## Middleware
The important part of the integration is to get the userId and Authress client to authorize the user. This is done by adding a middleware to parse out the caller, and one line in the service to validate this.


### Development
To test and run the example:
* `npm install` or `yarn`
* `npm start` or `yarn start`

And then an example using curl, make sure to replace `TOKEN` with a validate token already registered in Authress.
* `curl -X GET http://localhost:8080/v1/resources/Resource1 -H"Authorization: Bearer TOKEN"`

Or for a working examples
```sh
curl -X GET http://localhost:8080/v1/resources/Resource1 \
  -H"Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm92aWRlcnx1c2VySWQiLCJuYW1lIjoiQXBwbGljYXRpb24gVXNlciIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcm92aWRlci9vYXV0aDIiLCJhdWQiOiJFeHByZXNzTWljcm9zZXJ2aWNlIn0.aCiRCN2KPxg7t0d1gj5Fc6S1lUJOI1KV34RIEVIl22rhwxZRLLpRKOeu8O_9iLnxbV8CLQUawHR2N4N5mmDZOepGdmR2Exq7x5mg0nZMBTfjqzU4lT_KkULm8jnuEraK9uj82Aeh8h4vPV5_VAdPPrYMIaJIMcvfMCjjuZqUkmnKujgiHLLjgzfiyJ0kVe0e8DOrdaROQQGB5LC84EqOAhxOU0Ev3yfBJOkhCncMbNtbsem3wuZUMl-Y3-wCXgkxW5WQJWANoe6V55qaUkBaAygx5h2NGTqxOPeUEDjFw7zFupkJmX_TXbqSWyZ6fU8m2qIrEUCPvZOGfJgBW7WzOQ"

```
