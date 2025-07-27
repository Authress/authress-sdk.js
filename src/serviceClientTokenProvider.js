const { SignJWT } = require('jose');
const { createPrivateKey } = require('crypto');
const ArgumentRequiredError = require('./argumentRequiredError');
const InvalidAccessKeyError = require('./invalidAccessKeyError');
const { sanitizeUrl } = require('./util');

const packageInfo = require('../package.json');

function getIssuer(unsanitizedAuthressCustomDomain, decodedAccessKey) {
  const authressCustomDomain = sanitizeUrl(unsanitizedAuthressCustomDomain).replace(/\/+$/, '');
  return `${authressCustomDomain}/v1/clients/${encodeURIComponent(decodedAccessKey.clientId)}`;
}

class ServiceClientTokenProvider {
  constructor(accessKey, authressCustomDomain) {
    const accountId = accessKey.split('.')[2];
    this.accountId = accountId;
    this.authressCustomDomain = authressCustomDomain;
    this.decodedAccessKey = {
      clientId: accessKey.split('.')[0], keyId: accessKey.split('.')[1],
      audience: `${accountId}.accounts.authress.io`, privateKey: accessKey.split('.')[3]
    };
  }

  async getToken(options = { jwtOverrides: { header: {}, payload: {} } }) {
    if (this.cachedKeyData && this.cachedKeyData.token && this.cachedKeyData.expires > Date.now() + 3600000) {
      return this.cachedKeyData.token;
    }

    // Do not set the issuer to be ${accountId}.api-region.authress.io it should always be set as the authress custom domain, the custom domain, or the generic api.authress.io one
    const useAuthressCustomDomain = this.authressCustomDomain && !this.authressCustomDomain.match(/authress\.io/);

    const now = Math.round(Date.now() / 1000);
    const jwt = Object.assign({
      aud: this.decodedAccessKey.audience,
      iss: getIssuer(useAuthressCustomDomain && this.authressCustomDomain || `${this.accountId}.api.authress.io`, this.decodedAccessKey),
      sub: this.decodedAccessKey.clientId,
      client_id: this.decodedAccessKey.clientId,
      iat: now,
      // valid for 24 hours
      exp: now + 60 * 60 * 24,
      scope: 'openid'
    }, options?.jwtOverrides?.payload || {});

    if (!this.decodedAccessKey.privateKey) {
      throw new InvalidAccessKeyError();
    }

    try {
      const importedKey = createPrivateKey({ key: Buffer.from(this.decodedAccessKey.privateKey, 'base64'), format: 'der', type: 'pkcs8' });
      const header = Object.assign({ alg: 'EdDSA', kid: this.decodedAccessKey.keyId, typ: 'at+jwt' }, options?.jwtOverrides?.header || {});
      const token = await new SignJWT(jwt).setProtectedHeader(header).sign(importedKey);
      this.cachedKeyData = { token, expires: jwt.exp * 1000 };
      return token;
    } catch (error) {
      if (error.code === 'ERR_OSSL_ASN1_NOT_ENOUGH_DATA' || error.code === 'ERR_OSSL_ASN1_HEADER_TOO_LONG' || error.message === 'Failed to read private key') {
        throw new InvalidAccessKeyError();
      }
      throw error;
    }
  }

  async generateUserLoginUrl(authressCustomDomainLoginUrlInput, authenticationRequestIdInput, clientIdInput, userIdInput) {
    if (!authressCustomDomainLoginUrlInput) {
      throw new ArgumentRequiredError('authressCustomDomainLoginUrl', 'The authressCustomDomainLoginUrl is not specified in the incoming login request, this should match the configured Authress custom domain.');
    }

    let authressCustomDomainLoginUrl = authressCustomDomainLoginUrlInput;
    let authenticationRequestId = authenticationRequestIdInput;
    let clientId = clientIdInput;
    let userId = userIdInput;
    if (typeof authressCustomDomainLoginUrlInput === 'object' && authressCustomDomainLoginUrlInput.authenticationUrl) {
      userId = authenticationRequestIdInput;
      const parameters = [...new URL(authressCustomDomainLoginUrlInput.authenticationUrl).searchParams.entries()].reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
      authressCustomDomainLoginUrl = authressCustomDomainLoginUrlInput.authenticationUrl;
      clientId = parameters.client_id;
      authenticationRequestId = parameters.state;
    }
    
    if (!authenticationRequestId) {
      throw new ArgumentRequiredError('state', 'The state is required to generate a authorization code redirect for is required, and should be present in the authenticationUrl.');
    }

    if (!clientId || clientId !== this.decodedAccessKey.clientId) {
      throw new ArgumentRequiredError('clientId', 'The clientId should be specified in the authenticationUrl. It should match the service client ID.');
    }
    if (!userId) {
      throw new ArgumentRequiredError('userId', 'The user to generate an authorization code redirect for is required.');
    }

    const customDomainFallback = new URL(authressCustomDomainLoginUrl).origin;
    const issuer = getIssuer(this.authressCustomDomain || customDomainFallback, this.decodedAccessKey);

    const now = Math.round(Date.now() / 1000);
    const clientSdkString = `Authress SDK; Javascript; ${packageInfo.version}; ${this.decodedAccessKey.clientId}`;
    const codeJwt = {
      aud: this.decodedAccessKey.audience,
      iss: issuer,
      sub: userId,
      client_id: this.decodedAccessKey.clientId,
      jti: `${clientSdkString}-${userId}`,
      iat: now,
      exp: now + 3600,
      max_age: 3600,
      scope: 'openid'
    };

    if (userId.match(/@/)) {
      codeJwt.email = userId;
      codeJwt.email_verified = true;
    }

    const importedKey = createPrivateKey({ key: Buffer.from(this.decodedAccessKey.privateKey, 'base64'), format: 'der', type: 'pkcs8' });
    const encodedCode = await new SignJWT(codeJwt).setProtectedHeader({ alg: 'EdDSA', kid: this.decodedAccessKey.keyId, typ: 'oauth-authz-req+jwt' }).sign(importedKey);

    const url = new URL(authressCustomDomainLoginUrl);
    // the UI always redirects to /login for handling redirects, we definitely cannot change this now as customers will have registered this path in third party tools.
    url.pathname = '/login';
    url.searchParams.set('code', encodedCode);
    url.searchParams.set('iss', issuer);
    url.searchParams.set('state', authenticationRequestId);
    return url.toString();
  }
}

module.exports = ServiceClientTokenProvider;
