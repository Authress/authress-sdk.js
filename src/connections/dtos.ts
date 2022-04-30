/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 *
 * @export
 * @interface Connection
 */
export interface Connection {
    /**
     *
     * @type {string}
     * @memberof Connection
     */
    type?: Connection.TypeEnum;
    /**
     *
     * @type {string}
     * @memberof Connection
     */
    connectionId?: string;
    /**
     *
     * @type {string}
     * @memberof Connection
     */
    authenticationUrl: string;
    /**
     *
     * @type {string}
     * @memberof Connection
     */
    tokenUrl?: string;
    /**
     *
     * @type {string}
     * @memberof Connection
     */
    issuerUrl?: string;
    /**
     *
     * @type {string}
     * @memberof Connection
     */
    providerCertificate?: string;
    /**
     *
     * @type {string}
     * @memberof Connection
     */
    clientId?: string;
    /**
     *
     * @type {string}
     * @memberof Connection
     */
    clientSecret?: string;
    /**
     *
     * @type {ConnectionData}
     * @memberof Connection
     */
    data?: ConnectionData;
    /**
     *
     * @type {ConnectionDefaultConnectionProperties}
     * @memberof Connection
     */
    defaultConnectionProperties?: ConnectionDefaultConnectionProperties;
    /**
     *
     * @type {Date}
     * @memberof Connection
     */
    createdTime?: Date;
}

/**
 * @export
 * @namespace Connection
 */
export namespace Connection {
    /**
     * @export
     * @enum {string}
     */
    export enum TypeEnum {
        OAUTH2 = 'OAUTH2',
        SAML2 = 'SAML2'
    }
}
/**
 * A collection of connections.
 * @export
 * @interface ConnectionCollection
 */
export interface ConnectionCollection {
    /**
     *
     * @type {Array<Connection>}
     * @memberof ConnectionCollection
     */
    connections: Array<Connection>;
}
/**
 *
 * @export
 * @interface ConnectionData
 */
export interface ConnectionData {
    /**
     *
     * @type {string}
     * @memberof ConnectionData
     */
    tenantId?: string;
    /**
     *
     * @type {string}
     * @memberof ConnectionData
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof ConnectionData
     */
    supportedContentType?: ConnectionData.SupportedContentTypeEnum;
}

/**
 * @export
 * @namespace ConnectionData
 */
export namespace ConnectionData {
    /**
     * @export
     * @enum {string}
     */
    export enum SupportedContentTypeEnum {
        Json = 'application/json',
        XWwwFormUrlencoded = 'application/x-www-form-urlencoded'
    }
}
/**
 *
 * @export
 * @interface ConnectionDefaultConnectionProperties
 */
export interface ConnectionDefaultConnectionProperties {
    /**
     *
     * @type {string}
     * @memberof ConnectionDefaultConnectionProperties
     */
    scope?: string;
}

/**
 * The user credentials for this connection which can be used to access the connection provider APIs.
 * @export
 * @interface UserConnectionCredentials
 */
export interface UserConnectionCredentials {
  /**
   * The access token.
   * @type {string}
   * @memberof UserConnectionCredentials
   */
  accessToken: string;
}
