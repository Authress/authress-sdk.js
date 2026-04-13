/**
 *
 * @export
 * @class AuthressHttpError
 * @extends {Error}
 */
class AuthressHttpError extends Error {
  constructor(url, status, data, headers) {
    super(data?.title || url);
    this.name = 'AuthressHttpError';
    this.code = 'AuthressHttpError';
    this.url = url;
    this.status = status;
    this.data = data;
    this.headers = headers;
  }
}

module.exports = AuthressHttpError;
