/**
 *
 * @export
 * @class TokenVerificationError
 * @extends {Error}
 */
class TokenVerificationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TokenVerificationError';
    this.code = 'Unauthorized';
  }
}

module.exports = TokenVerificationError;
