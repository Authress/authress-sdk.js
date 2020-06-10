/**
 *
 * @export
 * @class UnauthorizedError
 * @extends {Error}
 */
class UnauthorizedError extends Error {
  constructor(userId, resourceUri, permission) {
    super(`User=${userId} does not have permission=${permission} to resourceUri=${resourceUri}.`);
    this.userId = userId;
    this.resourceUri = resourceUri;
    this.permission = permission;
    this.name = 'UnauthorizedError';
    this.code = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
