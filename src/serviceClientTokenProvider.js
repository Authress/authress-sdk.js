const { default: JwtSigner } = require('jose/jwt/sign');
const { createPrivateKey } = require('crypto');
const ArgumentRequiredError = require('./argumentRequiredError');

function getIssuer(authressCustomDomain, decodedAccessKey) {
  return `https://${authressCustomDomain.replace(/^(https?:\/\/)/, '')}/v1/clients/${encodeURIComponent(decodedAccessKey.clientId)}`;
}

module.exports = function(accessKey, authressCustomDomain) {
  const decodedAccessKey = {
    clientId: accessKey.split('.')[0], keyId: accessKey.split('.')[1],
    audience: `${accessKey.split('.')[2]}.accounts.authress.io`, privateKey: accessKey.split('.')[3]
  };

  const innerGetToken = async () => {
    if (this.cachedKeyData && this.cachedKeyData.token && this.cachedKeyData.expires > Date.now() + 3600000) {
      return this.cachedKeyData.token;
    }

    const now = Math.round(Date.now() / 1000);
    const jwt = {
      aud: decodedAccessKey.audience,
      iss: getIssuer(authressCustomDomain || 'api.authress.io', decodedAccessKey),
      sub: decodedAccessKey.clientId,
      iat: now,
      // valid for 24 hours
      exp: now + 60 * 60 * 24,
      scope: 'openid'
    };

    const importedKey = createPrivateKey({ key: Buffer.from(decodedAccessKey.privateKey, 'base64'), format: 'der', type: 'pkcs8' });
    const token = await new JwtSigner(jwt).setProtectedHeader({ alg: 'EdDSA', kid: decodedAccessKey.keyId, typ: 'at+jwt' }).sign(importedKey);
    this.cachedKeyData = { token, expires: jwt.exp * 1000 };
    return token;
  };

  innerGetToken.getToken = innerGetToken;
  innerGetToken.generateUserLoginUrl = async (authressCustomDomainLoginUrl, state, clientId, userId) => {
    if (!authressCustomDomainLoginUrl) {
      throw new ArgumentRequiredError('authressCustomDomainLoginUrl', 'The authressCustomDomainLoginUrl is specified in the incoming login request, this should match the configured Authress custom domain.');
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

    const customDomainFallback = new URL(authressCustomDomainLoginUrl).origin;
    const issuer = getIssuer(authressCustomDomain || customDomainFallback, decodedAccessKey);

    const now = Math.round(Date.now() / 1000);
    const jwt = {
      aud: decodedAccessKey.audience,
      iss: issuer,
      sub: userId,
      client_id: decodedAccessKey.clientId,
      iat: now,
      exp: now + 60,
      max_age: 60,
      scope: 'openid'
    };

    const importedKey = createPrivateKey({ key: Buffer.from(decodedAccessKey.privateKey, 'base64'), format: 'der', type: 'pkcs8' });
    const code = await new JwtSigner(jwt).setProtectedHeader({ alg: 'EdDSA', kid: decodedAccessKey.keyId, typ: 'oauth-authz-req+jwt' }).sign(importedKey);

    const url = new URL(authressCustomDomainLoginUrl);
    url.searchParams.set('code', code);
    url.searchParams.set('iss', issuer);
    url.searchParams.set('state', state);
    return url.toString();
  };
  return innerGetToken;
};
