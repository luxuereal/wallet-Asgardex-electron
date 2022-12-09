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

import {
    QuoteFees,
} from './';

/**
 * @export
 * @interface QuoteSaverDepositResponse
 */
export interface QuoteSaverDepositResponse {
    /**
     * the inbound address for the transaction on the source chain
     * @type {string}
     * @memberof QuoteSaverDepositResponse
     */
    inbound_address: string;
    /**
     * generated memo for the deposit
     * @type {string}
     * @memberof QuoteSaverDepositResponse
     */
    memo: string;
    /**
     * the minimum amount of the target asset the user can expect to deposit after fees
     * @type {string}
     * @memberof QuoteSaverDepositResponse
     */
    expected_amount_out: string;
    /**
     * the approximate number of source chain blocks required before processing
     * @type {number}
     * @memberof QuoteSaverDepositResponse
     */
    inbound_confirmation_blocks?: number;
    /**
     * the approximate seconds for block confirmations required before processing
     * @type {number}
     * @memberof QuoteSaverDepositResponse
     */
    inbound_confirmation_seconds?: number;
    /**
     * @type {QuoteFees}
     * @memberof QuoteSaverDepositResponse
     */
    fees: QuoteFees;
    /**
     * the swap slippage in basis points
     * @type {number}
     * @memberof QuoteSaverDepositResponse
     */
    slippage_bps: number;
}
