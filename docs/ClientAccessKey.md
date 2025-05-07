# ClientAccessKey

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**keyId** | **String** | The unique ID of the client access key. | [optional] [readonly] 
**clientId** | **String** | The unique ID of the client. | [optional] [readonly] 
**publicKey** | **String** | Specify a public key on access key creation to bring your own private key. When left blank, Authress will automatically generate a private and public key pair and then return the private key as part of the request. This property holds the public key. | [optional] 
**generationDate** | **Date** |  | [optional] [readonly] 
**clientSecret** | **String** | The unencoded OAuth client secret used with the OAuth endpoints to request a JWT using the &#x60;client_credentials&#x60; grant type. Pass the clientId and the clientSecret to the documented /tokens endpoint. | [optional] [readonly] 
**accessKey** | **String** | An encoded access key which contains identifying information for client access token creation. For direct use with the Authress SDKs. This private access key must be saved on first creation as it is discarded afterwards. Authress only saves the corresponding public key to verify the private access key. | [optional] [readonly] 


