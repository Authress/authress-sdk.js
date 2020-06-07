const { describe, it, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

describe('index.js', () => {
  describe('Syntax', () => {
    it('Should be valid node', () => {
      require('../index');
    });
  });
});

