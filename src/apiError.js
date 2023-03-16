/**
 *
 * @export
 * @class ApiError
 * @extends {Error}
 */
class ApiError extends Error {
  constructor(message, status, body, headers) {
    super(message);
    this.name = 'ApiError';
    this.code = 'ApiError';
    this.status = status;
    this.body = body;
    this.headers = headers;
  }
}

module.exports = ApiError;
