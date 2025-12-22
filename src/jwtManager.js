const base64url = require('base64url');
const crypto = require('crypto');

class JwtManager {
  decode(token) {
    try {
      return token && JSON.parse(base64url.decode(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }

  calculateAntiAbuseHash(props) {
    const timestamp = Date.now();
    const valueString = Object.values(props).filter(v => v).join('|');

    let fineTuner = 0;
    let hash = null;
    while (++fineTuner) {
      const verifier = `${timestamp};${fineTuner};${valueString}`;
      hash = base64url.encode(crypto.createHash('sha256').update(verifier).digest());
      if (hash.match(/^00/)) {
        return hash;
      }
    }

    throw Error('Could not calculate a valid anti abuse hash.');
  }
}

module.exports = new JwtManager();
