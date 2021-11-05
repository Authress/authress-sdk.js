const axios = require('axios');

const packageInfo = require('../package.json');

const defaultHeaders = {
  'Content-Type': 'application/json'
};

class HttpClient {
  constructor(baseUrl, tokenProvider) {
    this.baseUrl = baseUrl;
    this.tokenProvider = tokenProvider;

    const client = axios.create({ baseURL: baseUrl });

    client.interceptors.request.use(async config => {
      const token = await (typeof this.tokenProvider === 'function' ? this.tokenProvider() : this.tokenProvider.getToken());
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
        // 'X-Powered-By': `Javascript AuthressSDK version: ${packageInfo.version}`,
      };

      if (process && process.versions && process.versions.node) {
        config.headers['User-Agent'] = `Javascript AuthressSDK version: ${packageInfo.version}`;
      }
      return config;
    }, error => {
      let newError = error;
      if (error) {
        newError = error.message;

        if (error.response) {
          newError = {
            data: error.response.data || {},
            status: error.response.status,
            headers: error.response.headers
          };
        } else if (error.message) {
          newError = {
            message: error.message,
            code: error.code,
            stack: error.stack
          };
        }
      }

      throw newError;
    });

    client.interceptors.response.use(response => {
      return response;
    }, error => {
      const newError = error && error.response && {
        url: error.config && error.config.url,
        data: error.response.data || {},
        status: error.response.status,
        headers: error.response.headers
      } || error.message && { message: error.message, code: error.code, stack: error.stack } || error;

      throw newError;
    });

    this.client = client;
  }

  get(url, headers, type = 'json') {
    return this.client.get(url.toString(), {
      headers: Object.assign({}, defaultHeaders, headers),
      responseType: type
    });
  }

  delete(url, headers, type = 'json') {
    return this.client.delete(url.toString(), {
      headers: Object.assign({}, defaultHeaders, headers),
      responseType: type
    });
  }

  post(url, data, headers) {
    return this.client.post(url.toString(), data, {
      headers: Object.assign({}, defaultHeaders, headers)
    });
  }

  put(url, data, headers) {
    return this.client.put(url.toString(), data, {
      headers: Object.assign({}, defaultHeaders, headers)
    });
  }

  patch(url, data, headers) {
    return this.client.patch(url.toString(), data, {
      headers: Object.assign({}, defaultHeaders, headers)
    });
  }
}

module.exports = HttpClient;
