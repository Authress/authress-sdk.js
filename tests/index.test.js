const { describe, it } = require('mocha');

describe('index.js', () => {
  describe('Syntax', () => {
    it('Should be valid node', () => {
      require('../index');
    });

    // it('new authressSDK()', () => {
    //   const AuthressClient = require('../index');
    //   // const client = new AuthressClient();
    //   // client.userPermissions.authorizeUser();
    //   console.log(AuthressClient.serviceClientTokenProvider('aeoaoe')());
    // });
  });
});

