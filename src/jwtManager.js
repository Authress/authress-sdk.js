const base64url = require('base64url');

class JwtManager {
  decode(token) {
    try {
      return token && JSON.parse(base64url.decode(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }
}

module.exports = new JwtManager();
