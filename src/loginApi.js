const ArgumentRequiredError = require('./argumentRequiredError');
const jwtManager = require('./jwtManager');

const parseUrl = urlString => {
  if (!urlString) {
    return null;
  }

  try {
    return new URL(urlString);
  } catch {
    return null;
  }
};

class LoginApi {
  constructor(client) {
    this.client = client;
  }

  async updateAuthenticationRequest(authenticationRequestId, selfHostedLoginApplicationUrl, updateAuthenticationRequestParameters) {
    // verify required parameter 'authenticationRequestId' is not null or undefined
    if (authenticationRequestId === null || authenticationRequestId === undefined) {
      throw new ArgumentRequiredError('authenticationRequestId', 'Required parameter authenticationRequestId was null or undefined when calling updateAuthenticationRequest.');
    }
    if (updateAuthenticationRequestParameters === null || updateAuthenticationRequestParameters === undefined) {
      throw new ArgumentRequiredError('authenticationRequest', 'Required parameter authenticationRequest was null or undefined when calling updateAuthenticationRequest.');
    }

    if (!updateAuthenticationRequestParameters.connectionId && !updateAuthenticationRequestParameters.tenantLookupIdentifier && !updateAuthenticationRequestParameters.hint) {
      throw new ArgumentRequiredError('connectionId', 'Either parameter connectionId and tenantLookupIdentifier must be defined in updateAuthenticationRequest.');
    }

    if (!parseUrl(selfHostedLoginApplicationUrl)) {
      throw new ArgumentRequiredError('selfHostedLoginApplicationUrl', 'Required parameter selfHostedLoginApplicationUrl was not or undefined when calling updateAuthenticationRequest.');
    }

    const connectionId = updateAuthenticationRequestParameters.connectionId;
    const resolvedTenantLookupIdentifier = updateAuthenticationRequestParameters.hint || updateAuthenticationRequestParameters.tenantLookupIdentifier;
    const antiAbuseHash = await jwtManager.calculateAntiAbuseHash({ connectionId, tenantLookupIdentifier: resolvedTenantLookupIdentifier, authenticationRequestId });
    const requestBody = {
      antiAbuseHash,
      connectionId,
      tenantLookupIdentifier: resolvedTenantLookupIdentifier,
      connectionProperties: updateAuthenticationRequestParameters.connectionProperties
    };
    const headers = {
      origin: selfHostedLoginApplicationUrl
    };
    const response = await this.client.patch(`/api/authentication/${encodeURIComponent(String(authenticationRequestId))}`, requestBody, headers);
    return {
      authenticationUrl: response.data.authenticationUrl
    };
  }
}

module.exports = LoginApi;
