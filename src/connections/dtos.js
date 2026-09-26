const Connection = Object.freeze({
  TypeEnum: Object.freeze({
    OAUTH2: 'OAUTH2',
    SAML2: 'SAML2'
  })
});

const ConnectionData = Object.freeze({
  SupportedContentTypeEnum: Object.freeze({
    Json: 'application/json',
    XWwwFormUrlencoded: 'application/x-www-form-urlencoded'
  })
});

module.exports = { Connection, ConnectionData };
