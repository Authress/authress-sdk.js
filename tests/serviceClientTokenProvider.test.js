const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

const { ServiceClientTokenProvider } = require('../index');

let sandbox;
beforeEach(() => { sandbox = sinon.createSandbox(); });
afterEach(() => sandbox.restore());

describe('serviceClientTokenProvider.js', () => {
  describe('getToken', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'SC|uEsXtFNjUbf1LEgAGeUhC3.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider();
      const secondToken = await tokenProvider();
      expect(secondToken).to.eql(initialToken);
    });

    it('Validate cache tokens work with non-base64', async () => {
      const accessKey = 'eyJrZXlJZCI6IjRkZmM0MDJiLTZmOGUtNGZhNy1iYzM3LWZhMzFlMTVhNmRkYyIsInByaXZhdGVLZXkiOiItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2QUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktZd2dnU2lBZ0VBQW9JQkFRQ3IzcUkzSnBQN2tGRHZcbjFnVUl0c2x3V21EV01UbGk3VlRJZEJWNEN2VFpxZHNPNnNWMDFFc1RoOEJBM25QUjJZaUF2UEFuTTlnUTh4bUNcbjZpMzc4eHJUd2RrcS8rU0o5c3ByVkZVeVZxQ0JqKzRSUG1yNllpREgrMFV5Nm10eEI2MzcyaE13Vis0cDAxbDdcbjZSZnRDdWIrVmFOTUxGVTFObWhZRjZFUDNLN1IveklxbHNTemxTWUcwRWprd1ltZjY5RVN0Y2VUcXVkS2tnbGhcbkR3TG5QOGwvWFlCbnV4RDVDQkpXU0tBM0pKaEs0MDhyb2w0U2JpQjZPWFI1Z05ZbCtHakp6ZUt6dkVSUkN6anNcbjE0aUk0NXR0Ty9TaVF1NVJKbThrTDY1ZGc3dUp2dEYrejhZemZpaEtsaGdNSHkwTFVRTXNYZ3ZzVmN1QjhMYUdcbm11bDlZZU9KQWdNQkFBRUNnZ0VBSHc3ZFc0QUNMK3lWWTdIV09Rdm0vUUdvREN6YkJQQ0VhTERwakViV2xscm1cbmRoeWcwQXJwQWo5KzAzb2ZqZVYwa0djVU10RmdremVLL2FoWjVQUzZmVmZEYWN6U1BNZzNMZ3dRVlVkb08rR0pcbmtONHBzTk40dndxK0o0UkxKQ0xTSXZmMmpiN21EL0xjY2RMZWV2eUVYNk9VSGRqSkVST2k2WUJqbjUwdWprMzJcbmx3MEtHOTl2WnRWWmRPY3l6QTYrZG5xMUxWcEtXTEtNeG1uSWVwd2psN3BhbDIzNUI1MnE2dUZQUGZsN1FHS2NcbkN5bEZ3Q1JDZmM2VGV3anRpcVc3SzZkd1ZKSFkwcWFGcDdzZytkbXlGRlRXWmZuaTFkS1UyaTdhdng4a09BTjNcbk00N2szdDZySkJWQ2NHbnNrQzJ5eVpHVHhNNlVKY3lxZVd3Z3QwUUJBUUtCZ1FEY3VLVWFRRnR0Y1FCb05aQ1RcbkowUDVVQjhweGNtVFVwOTZGdTVjd0VPc0xtU2tLTkR3OXN0bWc2Q2N3R3Y1cDMwMjM2S0w4VGNkZmlMZFJwdlZcbjNsSjBCbzE4dWFoUnNlM2ZBM05yNGxWZ0RBakZLQkxuenZHK2FKUWJjdFJCdE5HZk9aOGEyN3grQ254L2JNaEpcbkF0VlgwRFBEcER2K2YvaGNLeFFSeU9VUDRRS0JnUURIVnhyUnl4cmViZVJ6TVcrYzQzTUYrSGxFNVUxT29TNjZcbmxtWWFvaGpXaHJ1TXo2VGc2NHZ0RWZjUHBpeXhpSjZSa1lLT29wdmhhZFQ2dWxxbE10ais2Zmw1NHBsVkhaVlFcbmNEY3pMTklRbjFPWUNlSzFZN2ZTS0EvdlpDQ2JnWi92aE9RTmE1d3VzcWdxUEY5emhOWEpyb1BKbWt5cUlmZFBcbk9TcG9zcGRvcVFLQmdEMzRHV0tsYndYckZCSXQ5OGxZM056Q2dmMVlhcC9TTXJRMGUvZk9nekYwVlExQjZHZStcbjRweUZtREpxVStaai8rUElKZnJrWG5VSlZRQ0xNblY1VmV6OWFmdjZwQ2RMclYxUHVyZ3ZjNGpqMkJLQ2pjeEhcbmJkZm54SzF3TCtmQ3ZKZlh0YlAwdlpjbG1vNnNIQTlqbkVKclVoMDdueHgxRVdYUE1uTkwxQVFCQW9HQVRWY0RcblJkQktiWEF2aVczdHd1NFFTNG02NnpzWUFtRFE4MzIwd2JLUWRuTXh3eEV4QkQ3L1BBeVRVWlFFbFNEUGZPVDZcbnhZSmJmbHFFVW44SStqMC9LYS8zcGcxL3RpRlROREZGaVdwaldpV20xajlIb1Y2K0RDQ1ZCaWxQNldXaWV0aVJcbmJvK0l1aW1BeTFvL0lsK3dYcDZCN1M4YmZZck9IQU91NjQ0VzVua0NnWUJ2WkdJTGRhQWkzYXRoenR0TVJaeFdcbm1oaXYyeXRRU2NIWTlMcVJCMGRYazZOUTkrMEU1MjdraG14Y3dCT1E2UDhrM0RnLyttQTlHWDFyOG15Z3JRTlZcbk9Gb2N2YW90Q2ZyZmdmZTZtRlI1Wm1PM3VRajZIWG42ZGJ3d2srcFEyVTYzMTA4eFRJb0hLd2prQ2xpdWFkTW5cbnFhN2dPUHFZMVA0RHZ2Y2NMSkswQ0E9PVxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwiYXVkaWVuY2UiOiIxMWZmZTk4ZC0xN2ZiLTRlYzktYTVhMi0xYmEyOGZmMmZlMmMuYWNjb3VudHMuYXV0aHJlc3MuaW8iLCJjbGllbnRJZCI6ImU5YWEwMGE4LWE4MzUtNGY4Zi04MzI1LWNiYmEyODUyOGUyMCJ9';
      const tokenProvider = new ServiceClientTokenProvider(Buffer.from(accessKey, 'base64').toString('utf8'));
      const initialToken = await tokenProvider();
      await new Promise(resolve => setTimeout(resolve, 1500));
      const secondToken = await tokenProvider();
      expect(secondToken).to.eql(initialToken);
    });
  });

  describe('getToken() function', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'SC|uEsXtFNjUbf1LEgAGeUhC3.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.getToken();
      const secondToken = await tokenProvider.getToken();
      expect(secondToken).to.eql(initialToken);
    });
  });

  describe('generateUserLoginUrl()', () => {
    it('Validate cache tokens work', async () => {
      const accessKey = 'clientId.uDeF.a43706ca-9647-40e4-aeae-7dcaa54bbab3.MC4CAQAwBQYDK2VwBCIEIE99LFw2c3DCiYwrY/Qkg1nIDiagoHtdCwb88RxarVYA';
      const tokenProvider = new ServiceClientTokenProvider(accessKey);
      const initialToken = await tokenProvider.generateUserLoginUrl('https://redirect-url.com', 'state', 'clientId', 'user1');
      await new Promise(resolve => setTimeout(resolve, 1500));
      const secondToken = await tokenProvider.generateUserLoginUrl('https://redirect-url.com', 'state', 'clientId', 'user1');
      expect(secondToken).to.not.eql(initialToken);
    });
  });
});

