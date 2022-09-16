const { jwtVerify, importJWK } = require('jose');
const base64url = require('base64url');
const axios = require('axios');
const { URL } = require('url');

const ServiceClientTokenProvider = require('./serviceClientTokenProvider');

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

async function getPublicKey(jwkKeyListUrl, kid) {
  const hashKey = JSON.stringify({ jwkKeyListUrl, kid });

  const getKeyUnCached = async () => {
    const result = await client.get(jwkKeyListUrl);
    const jwk = result.data.keys.find(key => key.kid === kid);
    if (jwk) {
      return jwk;
    }

    const error = new Error('No matching public key found for token');
    error.code = 'Unauthorized';
    throw error;
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

module.exports = async function(authressCustomDomain, requestToken, options = { expectedPublicKey: {}, verifierOptions: {} }) {
  if (!requestToken) {
    const error = new Error('Unauthorized');
    error.code = 'Unauthorized';
    throw error;
  }

  let authenticationToken = requestToken;
  let unverifiedToken = decode(requestToken);
  if (!unverifiedToken) {
    // Check if the token is a client secret and then create a token dynamically from that
    try {
      const replacementToken = await (new ServiceClientTokenProvider(requestToken))();
      authenticationToken = replacementToken;
      unverifiedToken = decode(replacementToken);
    } catch (tokenError) {
      const error = new Error('Unauthorized: Invalid token');
      error.code = 'Unauthorized';
      throw error;
    }
  }

  const kid = unverifiedToken && unverifiedToken.header && unverifiedToken.header.kid;
  if (!kid) {
    const error = new Error('Unauthorized: No KID in token');
    error.code = 'Unauthorized';
    throw error;
  }

  const issuer = unverifiedToken && unverifiedToken.payload && unverifiedToken.payload.iss;
  if (!issuer) {
    const error = new Error('Unauthorized: No Issuer found');
    error.code = 'Unauthorized';
    throw error;
  }

  const completeIssuerUrl = new URL(`https://${authressCustomDomain.replace(/^(https?:\/\/)/, '')}`);
  if (new URL(issuer).origin !== completeIssuerUrl.origin) {
    const error = new Error(`Unauthorized: Invalid Issuer: ${issuer}`);
    error.code = 'Unauthorized';
    throw error;
  }

  // Handle service client checking
  const clientIdMatcher = new URL(issuer).pathname.match(/^\/v\d\/clients\/([^/]+)$/);
  if (clientIdMatcher && clientIdMatcher[1] !== unverifiedToken.payload.sub) {
    const error = new Error(`Unauthorized: Invalid Sub found for service client token: ${unverifiedToken.payload.sub}`);
    error.code = 'Unauthorized';
    throw error;
  }

  const key = options.expectedPublicKey || await getPublicKey(`${issuer}/.well-known/openid-configuration/jwks`, kid);

  try {
    const verifiedToken = await jwtVerify(authenticationToken, await importJWK(key), { algorithms: ['EdDSA', 'RS512'], issuer, ...options.verifierOptions });
    return verifiedToken.payload;
  } catch (verifierError) {
    const error = new Error(`Unauthorized: ${verifierError.message}`);
    error.code = 'Unauthorized';
    throw error;
  }
};
