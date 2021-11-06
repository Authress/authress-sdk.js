const { default: verifyJwt } = require('jose/jwt/verify');
const { default: parseJwk } = require('jose/jwk/parse');
const base64url = require('base64url');
const axios = require('axios');
const { URL } = require('url');

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

module.exports = async function(authressCustomDomain, authenticationToken, options = { verifierOptions: {} }) {
  if (!authenticationToken) {
    const error = new Error('Unauthorized');
    error.code = 'Unauthorized';
    throw error;
  }

  const unverifiedToken = decode(authenticationToken);
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

  if (issuer !== new URL(`https://${authressCustomDomain.replace(/^(https?:\/\/)/, '')}`).origin) {
    const error = new Error(`Unauthorized: Invalid Issuer: ${issuer}`);
    error.code = 'Unauthorized';
    throw error;
  }

  const key = await getPublicKey(`${issuer}/.well-known/openid-configuration/jwks`, kid);

  try {
    const verifiedToken = await verifyJwt(authenticationToken, await parseJwk(key), { algorithms: ['EdDSA', 'RS512'], issuer, ...options.verifierOptions });
    return verifiedToken.payload;
  } catch (verifierError) {
    const error = new Error(`Unauthorized: ${verifierError.message}`);
    error.code = 'Unauthorized';
    throw error;
  }
};
