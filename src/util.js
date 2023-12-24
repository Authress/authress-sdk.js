module.exports.sanitizeUrl = function sanitizeUrl(url) {
  if (url.startsWith('http')) {
    return url;
  }

  if (url.match(/^localhost/)) {
    return `http://${url}`;
  }

  return `https://${url}`;
};
