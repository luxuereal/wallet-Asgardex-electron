// tslint:disable
/**
 * Thornode API
 * Thornode REST API.
 *
 * The version of the OpenAPI document: 1.103.0
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    Coin,
} from './';

/**
 * @export
 * @interface TxStatusResponsePlannedOutTxs
 */
export interface TxStatusResponsePlannedOutTxs {
    /**
     * @type {string}
     * @memberof TxStatusResponsePlannedOutTxs
     */
    chain: string;
    /**
     * @type {string}
     * @memberof TxStatusResponsePlannedOutTxs
     */
    to_address: string;
    /**
     * @type {Coin}
     * @memberof TxStatusResponsePlannedOutTxs
     */
    coin: Coin;
}