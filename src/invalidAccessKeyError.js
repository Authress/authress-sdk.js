/**
 *
 * @export
 * @class InvalidAccessKeyError
 * @extends {Error}
 */
class InvalidAccessKeyError extends Error {
  constructor() {
    super('The provided access key is invalid');
    this.name = 'InvalidAccessKeyError';
    this.code = 'InvalidAccessKeyError';
  }
}

module.exports = InvalidAccessKeyError;
