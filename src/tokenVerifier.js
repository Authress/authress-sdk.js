const jwtManager = require('jsonwebtoken');
const axios = require('axios');
const { URL } = require('url');
const jwkConverter = require('jwk-to-pem');

const client = axios.create();
async function getPublicKey(jwkKeyListUrl, kid) {
  const result = await client.get(jwkKeyListUrl);
  const jwk = result.data.keys.find(key => key.kid === kid);
  if (jwk) {
    return jwkConverter(jwk);
  }

  const error = new Error('No matching public key found for token');
  error.code = 'Unauthorized';
  throw error;
}

module.exports = async function(authressCustomDomain, authenticationToken) {
  if (!authenticationToken) {
    const error = new Error('Unauthorized');
    error.code = 'Unauthorized';
    throw error;
  }

  // Verify the issuer
  const unverifiedToken = jwtManager.decode(authenticationToken, { complete: true });
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

  try {
    const key = await getPublicKey(`${issuer}/.well-known/openid-configuration/jwks`, kid);
    const identity = jwtManager.verify(authenticationToken, key, { algorithms: ['RS256', 'RS384', 'RS512'], issuer });
    return identity;
  } catch (verifierError) {
    const error = new Error(`Unauthorized: ${verifierError.message}`);
    error.code = 'Unauthorized';
    throw error;
  }
};
