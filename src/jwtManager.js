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
    const valueString = Object.values(props).filter(v => v)
    .map(v => {
      if (!v || typeof v !== 'object' || Array.isArray(v)) {
        return v;
      }

      const objectValue = Object.keys(v).sort((a, b) => a.localeCompare(b)).map(key => v[key]).join('-');
      return objectValue;
    }).join('|');

    let fineTuner = 0;
    while (++fineTuner) {
      const verifier = `${timestamp};${fineTuner};${valueString}`;
      const hash = base64url.encode(crypto.createHash('sha256').update(verifier).digest());
      if (hash.match(/^00/)) {
        return `v2;${timestamp};${fineTuner};${hash}`;
      }
    }

    throw Error('Could not calculate a valid anti abuse hash.');
  }
}

module.exports = new JwtManager();
