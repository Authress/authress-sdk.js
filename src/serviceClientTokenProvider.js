const jwtManager = require('jsonwebtoken');
const { default: JwtSigner } = require('jose/jwt/sign');
const { createPrivateKey } = require('crypto');

module.exports = function(accessKey) {
  return async () => {
    if (this.cachedKeyData && this.cachedKeyData.token && this.cachedKeyData.expires > Date.now() + 3600000) {
      return this.cachedKeyData.token;
    }

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

    if (alg === 'RS256') {
      const options = { algorithm: 'RS256', keyid: decodedAccessKey.keyId };
      const token = await jwtManager.sign(jwt, decodedAccessKey.privateKey, options);
      this.cachedKeyData = { token, expires: jwt.exp * 1000 };
      return token;
    }

    const importedKey = createPrivateKey({ key: Buffer.from(decodedAccessKey.privateKey, 'base64'), format: 'der', type: 'pkcs8' });
    const token = await new JwtSigner(jwt).setProtectedHeader({ alg: 'EdDSA', kid: decodedAccessKey.keyId }).sign(importedKey);
    return token;
  };
};
