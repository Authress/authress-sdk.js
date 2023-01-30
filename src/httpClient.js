const axios = require('axios');

const packageInfo = require('../package.json');

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
      if (error.code === 'EPIPE' || error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET' || error.status >= 500) {
        await new Promise(resolve => setTimeout(resolve, 10 * 2 ** iteration));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

class HttpClient {
  constructor(baseUrl, tokenProvider) {
    this.baseUrl = new URL(`https://${baseUrl.replace(/^(https?:\/\/)/, '')}`).toString().replace(/\/$/, '');
    this.tokenProvider = tokenProvider;

    const client = axios.create({ baseURL: this.baseUrl });

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
    return retryExecutor(() => {
      return this.client.get(url.toString(), {
        headers: Object.assign({}, defaultHeaders, headers),
        responseType: type
      });
    });
  }

  delete(url, headers, type = 'json') {
    return retryExecutor(() => {
      return this.client.delete(url.toString(), {
        headers: Object.assign({}, defaultHeaders, headers),
        responseType: type
      });
    });
  }

  post(url, data, headers) {
    return retryExecutor(() => {
      return this.client.post(url.toString(), data, {
        headers: Object.assign({}, defaultHeaders, headers)
      });
    });
  }

  put(url, data, headers) {
    return retryExecutor(() => {
      return this.client.put(url.toString(), data, {
        headers: Object.assign({}, defaultHeaders, headers)
      });
    });
  }

  patch(url, data, headers) {
    return retryExecutor(() => {
      return this.client.patch(url.toString(), data, {
        headers: Object.assign({}, defaultHeaders, headers)
      });
    });
  }
}

module.exports = HttpClient;
