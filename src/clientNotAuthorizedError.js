const AuthressHttpError = require('./apiError');

/**
 *
 * @export
 * @class ClientNotAuthorizedToCheckPermissionError
 * @extends {AuthressHttpError}
 */
class ClientNotAuthorizedToCheckPermissionError extends AuthressHttpError {
  constructor(url, data, headers) {
    super(url, 403, data, headers);
    this.message = data?.title || url;
    this.name = 'ClientNotAuthorizedToCheckPermissionError';
    this.code = 'ClientNotAuthorizedToCheckPermissionError';
  }
}

module.exports = ClientNotAuthorizedToCheckPermissionError;
