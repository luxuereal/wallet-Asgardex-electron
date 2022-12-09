// tslint:disable
/**
 * Thornode API
 * Thornode REST API.
 *
 * The version of the OpenAPI document: 1.101.0
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface VersionResponse
 */
export interface VersionResponse {
    /**
     * current version
     * @type {string}
     * @memberof VersionResponse
     */
    current: string;
    /**
     * next version
     * @type {string}
     * @memberof VersionResponse
     */
    next: string;
    /**
     * querier version
     * @type {string}
     * @memberof VersionResponse
     */
    querier: string;
}
