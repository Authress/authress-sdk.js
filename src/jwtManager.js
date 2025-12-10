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

  async calculateAntiAbuseHash(props) {
    const timestamp = Date.now();
    const valueString = Object.values(props).filter(v => v).join('|');

    let fineTuner = 0;
    let hash = null;
    while (++fineTuner) {
      hash = base64url.encode(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${timestamp};${fineTuner};${valueString}`)));
      if (hash.match(/^00/)) {
        break;
      }
    }

    return `v2;${timestamp};${fineTuner};${hash}`;
  }
}

module.exports = new JwtManager();
