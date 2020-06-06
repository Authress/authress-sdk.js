/**
 *
 * @export
 * @class ArgumentRequiredError
 * @extends {Error}
 */
class ArgumentRequiredError extends Error {
  constructor(field, message) {
    super(message);
    this.field = field;
    this.name = 'ArgumentRequiredError';
    this.code = 'ArgumentRequiredError';
  }
}

module.exports = ArgumentRequiredError;
