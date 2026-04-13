const AuthressHttpError = require('./apiError');

/**
 *
 * @export
 * @class UnauthorizedError
 * @extends {AuthressHttpError}
 */
class UnauthorizedError extends AuthressHttpError {
  constructor(userId, resourceUri, permission, url, data, headers) {
    super(url, 404, data, headers);
    this.message = data?.title || `User=${userId} does not have permission=${permission} to resourceUri=${resourceUri}.`;
    this.userId = userId;
    this.resourceUri = resourceUri;
    this.permission = permission;
    this.name = 'UnauthorizedError';
    this.code = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
