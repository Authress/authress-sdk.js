const { jwtVerify, importJWK } = require('jose');
const base64url = require('base64url');
const axios = require('axios');
const { URL } = require('url');

const ServiceClientTokenProvider = require('./serviceClientTokenProvider');
const TokenVerificationError = require('./tokenVerificationError');
const { sanitizeUrl } = require('./util');

const keyMap = {};
const client = axios.create();

function decode(token) {
  try {
    return token && {
      header: JSON.parse(base64url.decode(token.split('.')[0])),
      payload: JSON.parse(base64url.decode(token.split('.')[1]))
    };
  } catch (error) {
    return null;
  }
}

async function getPublicKey(httpClient, jwkKeyListUrl, kid) {
  const hashKey = JSON.stringify({ jwkKeyListUrl, kid });

  const getKeyUnCached = async () => {
    const result = await httpClient.get(jwkKeyListUrl);
    const jwk = result.data.keys.find(key => key.kid === kid);
    if (jwk) {
      return jwk;
    }

    throw new TokenVerificationError('No matching public key found for token');
  };

  if (!keyMap[hashKey]) {
    keyMap[hashKey] = getKeyUnCached();
  }

  try {
    const key = await keyMap[hashKey];
    return key;
  } catch (error) {
    return keyMap[hashKey] = getKeyUnCached();
  }
}

function getSanitizedIssuerUrl(rawUrlString) {
  let sanitizedUrl = rawUrlString;
  if (!sanitizedUrl.startsWith('http')) {
    sanitizedUrl = sanitizedUrl.match(/^(localhost|authress.localhost.localstack.cloud:4566$)/) ? `http://${sanitizedUrl}` : `https://${sanitizedUrl}`;
  }

  const url = new URL(sanitizedUrl);
  const domainBaseUrlMatch = url.host.match(/^([a-z0-9-]+)[.][a-z0-9-]+[.]authress[.]io$/);
  if (domainBaseUrlMatch) {
    url.host = `${domainBaseUrlMatch[1]}.login.authress.io`;
    sanitizedUrl = url.toString();
  }

  return sanitizedUrl.replace(/[/]+$/, '');
}

module.exports = async function(authressCustomDomainOrHttpClient, requestToken, options = { expectedPublicKey: null, verifierOptions: {} }) {
  const httpClient = typeof authressCustomDomainOrHttpClient === 'object' ? authressCustomDomainOrHttpClient : client;
  const authressCustomDomain = typeof authressCustomDomainOrHttpClient === 'object' ? authressCustomDomainOrHttpClient.baseUrl : authressCustomDomainOrHttpClient;

  if (!requestToken) {
    throw new TokenVerificationError('Unauthorized: Token not specified');
  }

  let authenticationToken = requestToken;
  let unverifiedToken = decode(requestToken);
  if (!unverifiedToken) {
    // Check if the token is a client secret and then create a token dynamically from that
    try {
      const replacementToken = await (new ServiceClientTokenProvider(requestToken, authressCustomDomain))();
      authenticationToken = replacementToken;
      unverifiedToken = decode(replacementToken);
    } catch (tokenError) {
      throw new TokenVerificationError('Unauthorized: Invalid token');
    }
  }

  const kid = unverifiedToken && unverifiedToken.header && unverifiedToken.header.kid;
  if (!kid) {
    throw new TokenVerificationError('Unauthorized: No KID in token');
  }

  const issuer = unverifiedToken && unverifiedToken.payload && unverifiedToken.payload.iss;
  if (!issuer) {
    throw new TokenVerificationError('Unauthorized: No Issuer found');
  }

  const completeIssuerUrl = new URL(getSanitizedIssuerUrl(authressCustomDomain));
  const altIssuerUrl = new URL(sanitizeUrl(authressCustomDomain));
  try {
    if (new URL(issuer).origin !== completeIssuerUrl.origin && new URL(issuer).origin !== altIssuerUrl.origin) {
      throw new TokenVerificationError(`Unauthorized: Invalid Issuer: ${issuer}`);
    }
  } catch (error) {
    throw new TokenVerificationError(`Unauthorized: Invalid Issuer: ${issuer}`);
  }

  // Handle service client checking
  const clientIdMatcher = new URL(issuer).pathname.match(/^\/v\d\/clients\/([^/]+)$/);
  if (clientIdMatcher && clientIdMatcher[1] !== unverifiedToken.payload.sub) {
    throw new TokenVerificationError(`Unauthorized: Invalid Sub found for service client token: ${unverifiedToken.payload.sub}`);
  }

  const key = options.expectedPublicKey || await getPublicKey(httpClient, `${issuer}/.well-known/openid-configuration/jwks`, kid);

  try {
    const verifiedToken = await jwtVerify(authenticationToken, await importJWK(key), { algorithms: ['EdDSA', 'RS512'], issuer, ...options.verifierOptions });
    return verifiedToken.payload;
  } catch (verifierError) {
    throw new TokenVerificationError(`Unauthorized: ${verifierError.message}`);
  }
};
