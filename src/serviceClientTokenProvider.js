const jwtManager = require('jsonwebtoken');

module.exports = function(accessKey) {
  return async () => {
    if (this.cachedKeyData && this.cachedKeyData.token && this.cachedKeyData.expires > Date.now() + 3600000) {
      return this.cachedKeyData.token;
    }

    const decodedAccessKey = JSON.parse(Buffer.from(accessKey, 'base64').toString('utf8').trim());
    const now = Math.round(Date.now() / 1000);
    const jwt = {
      aud: decodedAccessKey.audience,
      iss: `https://api.authress.io/v1/clients/${encodeURIComponent(decodedAccessKey.clientId)}`,
      sub: decodedAccessKey.clientId,
      iat: now,
      // valid for 24 hours
      exp: now + 60 * 60 * 24,
      scope: 'openid'
    };
    const options = { algorithm: 'RS256', keyid: decodedAccessKey.keyId };
    const token = await jwtManager.sign(jwt, decodedAccessKey.privateKey, options);
    this.cachedKeyData = { token, expires: jwt.exp * 1000 };
    return token;
  };
};
