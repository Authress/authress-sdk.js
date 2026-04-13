const { expect } = require('chai');
const { createTestServer } = require('./helpers/testServer');
const HttpClient = require('../src/httpClient');
const AuthressHttpError = require('../src/apiError');

let server;
let baseUrl;

beforeEach(async () => {
  server = createTestServer();
  const info = await server.start();
  baseUrl = info.baseUrl;
});

afterEach(async () => {
  await server.close();
});

describe('httpClient.js', () => {
  // ── Request/response lifecycle ──────────────────────────────────────

  describe('successful responses', () => {
    it('GET returns { data, status, headers }', async () => {
      server.respondWith('GET', '/v1/items/123', 200, { itemId: '123', name: 'test' });
      const client = new HttpClient(baseUrl, 'test-token');
      const response = await client.get('/v1/items/123');

      expect(response).to.have.property('data');
      expect(response).to.have.property('status');
      expect(response).to.have.property('headers');
      expect(response.data).to.eql({ itemId: '123', name: 'test' });
      expect(response.status).to.eql(200);
    });

    it('POST sends JSON body and returns { data, status, headers }', async () => {
      server.respondWith('POST', '/v1/items', 201, { itemId: 'new-1' });
      const client = new HttpClient(baseUrl, 'test-token');
      const response = await client.post('/v1/items', { name: 'new item' });

      expect(response.status).to.eql(201);
      expect(response.data).to.eql({ itemId: 'new-1' });
      expect(server.requests).to.have.length(1);
      expect(server.requests[0].body).to.eql({ name: 'new item' });
    });

    it('PUT sends JSON body and returns { data, status, headers }', async () => {
      server.respondWith('PUT', '/v1/items/123', 200, { itemId: '123', name: 'updated' });
      const client = new HttpClient(baseUrl, 'test-token');
      const response = await client.put('/v1/items/123', { name: 'updated' });

      expect(response.status).to.eql(200);
      expect(response.data).to.eql({ itemId: '123', name: 'updated' });
      expect(server.requests[0].body).to.eql({ name: 'updated' });
    });

    it('PATCH sends JSON body and returns { data, status, headers }', async () => {
      server.respondWith('PATCH', '/v1/items/123', 200, { itemId: '123', name: 'patched' });
      const client = new HttpClient(baseUrl, 'test-token');
      const response = await client.patch('/v1/items/123', { name: 'patched' });

      expect(response.status).to.eql(200);
      expect(server.requests[0].body).to.eql({ name: 'patched' });
    });

    it('DELETE returns { data, status, headers }', async () => {
      server.respondWith('DELETE', '/v1/items/123', 200, {});
      const client = new HttpClient(baseUrl, 'test-token');
      const response = await client.delete('/v1/items/123');

      expect(response.status).to.eql(200);
      expect(response).to.have.property('data');
      expect(response).to.have.property('headers');
    });
  });

  // ── Error shapes ────────────────────────────────────────────────────

  describe('error handling', () => {
    it('4xx throws AuthressHttpError with url, data, status, headers', async () => {
      server.respondWith('GET', '/v1/items/missing', 404, { errorCode: 'NOT_FOUND' });
      const client = new HttpClient(baseUrl, 'test-token');

      try {
        await client.get('/v1/items/missing');
        expect.fail('should have thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(AuthressHttpError);
        expect(error).to.have.property('url');
        expect(error).to.have.property('data');
        expect(error).to.have.property('status', 404);
        expect(error).to.have.property('headers');
        expect(error.data).to.eql({ errorCode: 'NOT_FOUND' });
      }
    });

    it('4xx error url is the fully resolved URL', async () => {
      server.respondWith('GET', '/v1/items/missing', 400, {});
      const client = new HttpClient(baseUrl, 'test-token');

      try {
        await client.get('/v1/items/missing');
        expect.fail('should have thrown');
      } catch (error) {
        expect(error.url).to.match(/^http:\/\//);
        expect(error.url).to.include(baseUrl);
        expect(error.url).to.include('/v1/items/missing');
      }
    });

    it('error data defaults to {} when response body is empty', async () => {
      server.onRequest('GET', '/v1/items/empty', (req, res) => {
        res.writeHead(400);
        res.end();
      });
      const client = new HttpClient(baseUrl, 'test-token');

      try {
        await client.get('/v1/items/empty');
        expect.fail('should have thrown');
      } catch (error) {
        expect(error.status).to.eql(400);
        expect(error.data).to.eql({});
      }
    });

    it('network error throws { message, code, stack }', async () => {
      // Point to a port that is not listening
      const client = new HttpClient('http://127.0.0.1:1', 'test-token');

      try {
        await client.get('/v1/items/123');
        expect.fail('should have thrown');
      } catch (error) {
        expect(error).to.have.property('message');
        expect(error).to.have.property('stack');
      }
    });
  });

  // ── URL resolution ──────────────────────────────────────────────────

  describe('URL resolution', () => {
    it('relative path resolves against baseUrl', async () => {
      server.respondWith('GET', '/v1/records/abc', 200, { id: 'abc' });
      const client = new HttpClient(baseUrl, 'test-token');
      await client.get('/v1/records/abc');

      expect(server.requests).to.have.length(1);
      expect(server.requests[0].url).to.eql('/v1/records/abc');
    });

    it('baseUrl with path suffix merges correctly with relative path', async () => {
      server.respondWith('GET', '/api/v1/records/abc', 200, { id: 'abc' });
      const client = new HttpClient(`${baseUrl}/api`, 'test-token');
      await client.get('/v1/records/abc');

      expect(server.requests).to.have.length(1);
      expect(server.requests[0].url).to.eql('/api/v1/records/abc');
    });

    it('baseUrl with path suffix and trailing slash merges correctly', async () => {
      server.respondWith('GET', '/api/v1/records/abc', 200, { id: 'abc' });
      const client = new HttpClient(`${baseUrl}/api/`, 'test-token');
      await client.get('/v1/records/abc');

      expect(server.requests).to.have.length(1);
      expect(server.requests[0].url).to.eql('/api/v1/records/abc');
    });

    it('full URL object passes through without double-prepending baseUrl', async () => {
      server.respondWith('GET', '/v1/records', 200, { records: [] });
      const client = new HttpClient(baseUrl, 'test-token');
      const url = new URL(`${baseUrl}/v1/records`);
      url.search = 'limit=10&cursor=abc';
      await client.get(url);

      expect(server.requests).to.have.length(1);
      expect(server.requests[0].url).to.eql('/v1/records?limit=10&cursor=abc');
    });
  });

  // ── Token providers ─────────────────────────────────────────────────

  describe('token providers', () => {
    it('string token adds Authorization: Bearer header', async () => {
      server.respondWith('GET', '/v1/test', 200, {});
      const client = new HttpClient(baseUrl, 'my-static-token');
      await client.get('/v1/test');

      expect(server.requests[0].headers.authorization).to.eql('Bearer my-static-token');
    });

    it('function token provider receives baseUrl and adds Bearer header', async () => {
      let receivedBaseUrl;
      const tokenFn = url => {
        receivedBaseUrl = url;
        return 'fn-token-value';
      };
      server.respondWith('GET', '/v1/test', 200, {});
      const client = new HttpClient(baseUrl, tokenFn);
      await client.get('/v1/test');

      expect(server.requests[0].headers.authorization).to.eql('Bearer fn-token-value');
      expect(receivedBaseUrl).to.eql(baseUrl);
    });

    it('object token provider calls getToken() and sets authressCustomDomain', async () => {
      const tokenObj = {
        getToken: () => 'obj-token-value'
      };
      server.respondWith('GET', '/v1/test', 200, {});
      const client = new HttpClient(baseUrl, tokenObj);
      await client.get('/v1/test');

      expect(server.requests[0].headers.authorization).to.eql('Bearer obj-token-value');
      expect(tokenObj.authressCustomDomain).to.eql(baseUrl);
    });
  });

  // ── Header override ─────────────────────────────────────────────────

  describe('header override', () => {
    it('{ Authorization: undefined } results in no Authorization header', async () => {
      server.respondWith('GET', '/v1/public', 200, {});
      const client = new HttpClient(baseUrl, 'some-token');
      await client.get('/v1/public', { Authorization: undefined });

      expect(server.requests[0].headers).to.not.have.property('authorization');
    });
  });

  // ── Custom headers ──────────────────────────────────────────────────

  describe('custom headers', () => {
    it('caller-provided headers are sent to the server', async () => {
      server.respondWith('PUT', '/v1/records/123', 200, {});
      const client = new HttpClient(baseUrl, 'test-token');
      await client.put('/v1/records/123', { name: 'test' }, { 'If-Unmodified-Since': '2024-01-01T00:00:00Z' });

      expect(server.requests[0].headers['if-unmodified-since']).to.eql('2024-01-01T00:00:00Z');
    });
  });

  // ── User-Agent ──────────────────────────────────────────────────────

  describe('User-Agent', () => {
    it('sets User-Agent header in Node.js environment', async () => {
      server.respondWith('GET', '/v1/test', 200, {});
      const client = new HttpClient(baseUrl, 'test-token', 'my-app');
      await client.get('/v1/test');

      const ua = server.requests[0].headers['user-agent'];
      expect(ua).to.match(/^Authress SDK; Javascript; .+; my-app$/);
    });
  });

  // ── Default headers ─────────────────────────────────────────────────

  describe('default headers', () => {
    it('Content-Type: application/json is always sent', async () => {
      server.respondWith('GET', '/v1/test', 200, {});
      const client = new HttpClient(baseUrl, 'test-token');
      await client.get('/v1/test');

      expect(server.requests[0].headers['content-type']).to.eql('application/json');
    });

    it('Content-Type is sent on POST requests', async () => {
      server.respondWith('POST', '/v1/test', 200, {});
      const client = new HttpClient(baseUrl, 'test-token');
      await client.post('/v1/test', { key: 'value' });

      expect(server.requests[0].headers['content-type']).to.eql('application/json');
    });
  });

  // ── Retry logic ─────────────────────────────────────────────────────

  describe('retry logic', () => {
    it('5xx is retried up to 5 times', async () => {
      let callCount = 0;
      server.onRequest('GET', '/v1/flaky', (req, res) => {
        callCount++;
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      });
      const client = new HttpClient(baseUrl, 'test-token');

      try {
        await client.get('/v1/flaky');
        expect.fail('should have thrown');
      } catch (error) {
        expect(error.status).to.eql(500);
      }
      expect(callCount).to.eql(5);
    });

    it('4xx is NOT retried', async () => {
      let callCount = 0;
      server.onRequest('GET', '/v1/bad-request', (req, res) => {
        callCount++;
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request' }));
      });
      const client = new HttpClient(baseUrl, 'test-token');

      try {
        await client.get('/v1/bad-request');
        expect.fail('should have thrown');
      } catch (error) {
        expect(error.status).to.eql(400);
      }
      expect(callCount).to.eql(1);
    });

    it('success after transient 500s returns the success', async () => {
      let callCount = 0;
      server.onRequest('GET', '/v1/recoverable', (req, res) => {
        callCount++;
        if (callCount < 3) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'temporary' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ result: 'ok' }));
        }
      });
      const client = new HttpClient(baseUrl, 'test-token');
      const response = await client.get('/v1/recoverable');

      expect(response.status).to.eql(200);
      expect(response.data).to.eql({ result: 'ok' });
      expect(callCount).to.eql(3);
    });
  });

  // ── Public properties ────────────────────────────────────────────────

  describe('public properties', () => {
    it('exposes baseUrl as a property with trailing slash stripped', () => {
      const client = new HttpClient(`${baseUrl}/`, 'test-token');
      expect(client.baseUrl).to.not.match(/\/$/);
      expect(client.baseUrl).to.include('127.0.0.1');
    });

    it('exposes tokenProvider as a readable property', () => {
      const tokenFn = () => 'tok';
      const client = new HttpClient(baseUrl, tokenFn);
      expect(client.tokenProvider).to.eql(tokenFn);
    });

    it('tokenProvider can be reassigned and the new value is used for requests', async () => {
      server.respondWith('GET', '/v1/test', 200, {});
      const client = new HttpClient(baseUrl, 'original-token');
      client.tokenProvider = () => 'replaced-token';
      await client.get('/v1/test');

      expect(server.requests[0].headers.authorization).to.eql('Bearer replaced-token');
    });
  });
});
