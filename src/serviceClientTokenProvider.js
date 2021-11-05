const jwtManager = require('jsonwebtoken');
const { default: JwtSigner } = require('jose/jwt/sign');
const { createPrivateKey } = require('crypto');
const ArgumentRequiredError = require('./argumentRequiredError');

module.exports = function(accessKey) {
  const accessKeyBuffer = Buffer.from(accessKey, 'base64');
  const accessKeyString = accessKeyBuffer.toString('base64') === accessKey ? accessKeyBuffer.toString('utf8') : accessKey;
  let decodedAccessKey;
  let alg = 'RS256';
  try {
    decodedAccessKey = JSON.parse(accessKeyString.trim());
  } catch (error) {
    alg = 'EdDSA';
    decodedAccessKey = {
      clientId: accessKey.split('.')[0], keyId: accessKey.split('.')[1],
      audience: `${accessKey.split('.')[2]}.accounts.authress.io`, privateKey: accessKey.split('.')[3]
    };
  }

  const issuer = `https://api.authress.io/v1/clients/${encodeURIComponent(decodedAccessKey.clientId)}`;

  const innerGetToken = async (overrideUserId, expOffset) => {
    if (!overrideUserId && this.cachedKeyData && this.cachedKeyData.token && this.cachedKeyData.expires > Date.now() + 3600000) {
      return this.cachedKeyData.token;
    }

    const now = Math.round(Date.now() / 1000);
    const jwt = {
      aud: decodedAccessKey.audience,
      iss: issuer,
      sub: overrideUserId || decodedAccessKey.clientId,
      iat: now,
      // valid for 24 hours
      exp: now + (expOffset || 60 * 60 * 24),
      scope: 'openid'
    };

    if (alg === 'RS256') {
      const options = { algorithm: 'RS256', keyid: decodedAccessKey.keyId };
      const token = await jwtManager.sign(jwt, decodedAccessKey.privateKey, options);
      if (!overrideUserId) {
        this.cachedKeyData = { token, expires: jwt.exp * 1000 };
      }
      return token;
    }

    const importedKey = createPrivateKey({ key: Buffer.from(decodedAccessKey.privateKey, 'base64'), format: 'der', type: 'pkcs8' });
    const token = await new JwtSigner(jwt).setProtectedHeader({ alg: 'EdDSA', kid: decodedAccessKey.keyId }).sign(importedKey);
    if (!overrideUserId) {
      this.cachedKeyData = { token, expires: jwt.exp * 1000 };
    }
    return token;
  };

  innerGetToken.getToken = innerGetToken;
  innerGetToken.generateUserLoginUrl = async (redirectUrl, state, clientId, userId) => {
    if (!redirectUrl) {
      throw new ArgumentRequiredError('redirectUrl', 'The redirectUrl is specified in the request, this should match the configured Authress custom domain');
    }
    if (!state) {
      throw new ArgumentRequiredError('state', 'The state should match value to generate a authorization code redirect for is required.');
    }
    if (!clientId || clientId !== decodedAccessKey.clientId) {
      throw new ArgumentRequiredError('clientId', 'The clientId specifying the origin of the authentication request. This should match the service client ID');
    }
    if (!userId) {
      throw new ArgumentRequiredError('userId', 'The user to generate a authorization code redirect for is required.');
    }
    const url = new URL(redirectUrl);
    url.searchParams.set('code', await innerGetToken(userId, 60));
    url.searchParams.set('iss', issuer);
    url.searchParams.set('state', state);
    return url.toString();
  };
  return innerGetToken;
};
