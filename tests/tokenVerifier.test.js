const { describe, it, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const { TokenVerifier } = require('../index');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

describe('tokenVerifier.js', () => {
  describe('verifyToken', () => {
    it.skip('Validate cache tokens work', async () => {
      const userToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjMyWVJ5bnlqODNWdFJOYjVqc1VVVW4ifQ.eyJpc3MiOiJodHRwczovL2xvZ2luLmxvb3BzYXkuY29tIiwic3ViIjoiZm9vLWJhciIsImlhdCI6MTYwNDE1NDYwNiwiZXhwIjoxNjA0MjQxMDA2LCJzY29wZSI6Im9wZW5pZCJ9.hMm2NA1bfLQYr2eshlM_9uy6n2S-jnMXC4FZvGcGTd9MWjUo9zCAF_fTBIdzaWe-jkbb-9npNmgUcGqjDHpC3HUePW6jZcmfr5FxV5A81tffytfQe4Fm5N6RMuvfKVSRc6u54DlYJrVyxUf0Zf7BmRCCRUkdnoYPlnqLXuD8k91TTtCvynXl2ZsbEH--0eqhRKORM1Sqyusa9VDXvd-xtaKVsPzBTZ-CyvWBrklKDro0B76ANEhhMc3DTZ3-d_JY8NpfIg199BgfBLv6IeQp8xbvExXBWKBDURMuxPQd45D3nq_oDBEep2c6ZaTM0ZxPHr6uz5tnxUzSMgtSplU88g';
      const identity = await TokenVerifier('https://login.loopsay.com', userToken);
      console.log(identity);
    });
  });
});
