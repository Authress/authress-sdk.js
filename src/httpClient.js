const AuthressHttpError = require('./apiError');
const packageInfo = require('../package.json');
const { sanitizeUrl } = require('./util');

const defaultHeaders = {
  'Content-Type': 'application/json'
};

async function retryExecutor(func) {
  let lastError = null;
  for (let iteration = 0; iteration < 5; iteration++) {
    try {
      const result = await func();
      return result;
    } catch (error) {
      lastError = error;
      const errorCode = error.code || error.cause?.code;
      if (errorCode === 'EPIPE' || errorCode === 'ECONNABORTED' || errorCode === 'ETIMEDOUT' || errorCode === 'ECONNRESET'
        || errorCode === 'UND_ERR_SOCKET' || error.status >= 500) {
        await new Promise(resolve => setTimeout(resolve, 10 * 2 ** iteration));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

class HttpClient {
  constructor(baseUrl, tokenProvider, userAgent) {
    const sanitizedBaseUrl = sanitizeUrl(baseUrl);
    this.baseUrl = new URL(sanitizedBaseUrl).toString().replace(/\/+$/, '');
    this.tokenProvider = tokenProvider;
    this.userAgentSuffix = userAgent || '';
  }

  async _resolveHeaders(extraHeaders) {
    let token;
    if (typeof this.tokenProvider === 'string') {
      token = this.tokenProvider;
    } else if (typeof this.tokenProvider === 'function') {
      token = await this.tokenProvider(this.baseUrl);
    } else if (this.tokenProvider && typeof this.tokenProvider === 'object') {
      this.tokenProvider.authressCustomDomain = this.tokenProvider.authressCustomDomain || this.baseUrl;
      token = await this.tokenProvider.getToken();
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      ...defaultHeaders,
      ...extraHeaders
    };

    // Avoid breaking SDK usages in UIs that depend on this library, since we aren't allowed to set User-Agent in a browser context
    if (process && process.versions && process.versions.node) {
      headers['User-Agent'] = `Authress SDK; Javascript; ${packageInfo.version}; ${this.userAgentSuffix}`;
    }

    // Remove headers with undefined values (e.g. { Authorization: undefined } suppresses the auth header)
    for (const key of Object.keys(headers)) {
      if (headers[key] === undefined || headers[key] === null) {
        delete headers[key];
      }
    }

    return headers;
  }

  _resolveUrl(url) {
    const urlString = url.toString();
    if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
      return urlString;
    }
    return `${this.baseUrl}${urlString.startsWith('/') ? '' : '/'}${urlString}`;
  }

  async _request(method, url, data, extraHeaders) {
    const resolvedUrl = this._resolveUrl(url);
    const headers = await this._resolveHeaders(extraHeaders);

    const fetchOptions = { method, headers };
    if (data !== undefined && data !== null) {
      fetchOptions.body = JSON.stringify(data);
    }

    let response;
    try {
      response = await fetch(resolvedUrl, fetchOptions);
    } catch (networkError) {
      const code = networkError.cause?.code || networkError.code;
      throw {
        message: networkError.message,
        code,
        stack: networkError.stack
      };
    }

    let responseData;
    try {
      const text = await response.text();
      responseData = text ? JSON.parse(text) : {};
    } catch {
      responseData = {};
    }

    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    if (!response.ok) {
      const error = new AuthressHttpError(resolvedUrl, response.status, responseData || {}, responseHeaders);
      throw error;
    }

    return {
      data: responseData,
      status: response.status,
      headers: responseHeaders
    };
  }

  get(url, headers) {
    return retryExecutor(() => this._request('GET', url, null, headers));
  }

  delete(url, headers) {
    return retryExecutor(() => this._request('DELETE', url, null, headers));
  }

  post(url, data, headers) {
    return retryExecutor(() => this._request('POST', url, data, headers));
  }

  put(url, data, headers) {
    return retryExecutor(() => this._request('PUT', url, data, headers));
  }

  patch(url, data, headers) {
    return retryExecutor(() => this._request('PATCH', url, data, headers));
  }
}

module.exports = HttpClient;
