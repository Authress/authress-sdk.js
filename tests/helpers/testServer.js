const http = require('http');

function createTestServer() {
  const requests = [];
  const routes = [];

  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const parsedBody = body ? JSON.parse(body) : undefined;
      requests.push({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: parsedBody
      });

      const route = routes.find(r =>
        r.method === req.method
        && (typeof r.path === 'string' ? req.url === r.path || req.url.startsWith(`${r.path}?`) : r.path.test(req.url))
      );

      if (route) {
        if (typeof route.handler === 'function') {
          route.handler(req, res, parsedBody);
          return;
        }
        const responseHeaders = { 'Content-Type': 'application/json', ...route.responseHeaders };
        res.writeHead(route.status, responseHeaders);
        res.end(JSON.stringify(route.body));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'No route matched' }));
      }
    });
  });

  return {
    requests,

    respondWith(method, path, status, body, responseHeaders) {
      routes.push({ method, path, status, body: body || {}, responseHeaders: responseHeaders || {} });
    },

    onRequest(method, path, handler) {
      routes.push({ method, path, handler });
    },

    clearRoutes() {
      routes.length = 0;
    },

    clearRequests() {
      requests.length = 0;
    },

    start() {
      return new Promise((resolve, reject) => {
        server.listen(0, '127.0.0.1', () => {
          const { port } = server.address();
          resolve({ baseUrl: `http://127.0.0.1:${port}`, port });
        });
        server.on('error', reject);
      });
    },

    close() {
      return new Promise(resolve => {
        if (server.closeAllConnections) {
          server.closeAllConnections();
        }
        server.close(resolve);
      });
    }
  };
}

module.exports = { createTestServer };
