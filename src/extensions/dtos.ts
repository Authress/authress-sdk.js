/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-namespace */

import { IPaginated } from '../response.ts';

/**
 *
 * @export
 * @interface Extension
 */
export interface Extension {
    extensionId?: string;
    /**
     *
     * @type {string}
     * @memberof Extension
     */
    name: string;
    /**
     *
     * @type {ExtensionApplication}
     * @memberof Extension
     */
    application?: ExtensionApplication;
    /**
     *
     * @type {Date}
     * @memberof Extension
     */
    createdTime?: Date;
}

/**
 * A collection of extensions.
 * @export
 * @interface ExtensionCollection
 */
export interface ExtensionCollection extends IPaginated<ExtensionCollection>{
  /**
   *
   * @type {Array<Extension>}
   * @memberof ExtensionCollection
   */
  extensions: Array<Extension>;
}
/**
 *
 * @export
 * @interface ExtensionApplication
 */
export interface ExtensionApplication {
  /**
   *
   * @type {Array<string>}
   * @memberof ExtensionApplication
   */
  redirectUrls: Array<string>;
}
