// tslint:disable
/**
 * Midgard Public API
 * The Midgard Public API queries THORChain and any chains linked via the Bifröst and prepares information about the network to be readily available for public users. The API parses transaction event data from THORChain and stores them in a time-series database to make time-dependent queries easy. Midgard does not hold critical information. To interact with BEPSwap and Asgardex, users should query THORChain directly.
 *
 * The version of the OpenAPI document: 0.2.0
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface StatsData
 */
export interface StatsData {
    /**
     * Daily active users (unique addresses interacting)
     * @type {string}
     * @memberof StatsData
     */
    dailyActiveUsers?: string;
    /**
     * Daily transactions
     * @type {string}
     * @memberof StatsData
     */
    dailyTx?: string;
    /**
     * Monthly active users
     * @type {string}
     * @memberof StatsData
     */
    monthlyActiveUsers?: string;
    /**
     * Monthly transactions
     * @type {string}
     * @memberof StatsData
     */
    monthlyTx?: string;
    /**
     * Number of active pools
     * @type {string}
     * @memberof StatsData
     */
    poolCount?: string;
    /**
     * Total buying transactions
     * @type {string}
     * @memberof StatsData
     */
    totalAssetBuys?: string;
    /**
     * Total selling transactions
     * @type {string}
     * @memberof StatsData
     */
    totalAssetSells?: string;
    /**
     * Total RUNE balances
     * @type {string}
     * @memberof StatsData
     */
    totalDepth?: string;
    /**
     * Total earned (in RUNE Value).
     * @type {string}
     * @memberof StatsData
     */
    totalEarned?: string;
    /**
     * Total staking transactions
     * @type {string}
     * @memberof StatsData
     */
    totalStakeTx?: string;
    /**
     * Total staked (in RUNE Value).
     * @type {string}
     * @memberof StatsData
     */
    totalStaked?: string;
    /**
     * Total transactions
     * @type {string}
     * @memberof StatsData
     */
    totalTx?: string;
    /**
     * Total unique swappers & stakers
     * @type {string}
     * @memberof StatsData
     */
    totalUsers?: string;
    /**
     * Total (in RUNE Value) of all assets swapped since start.
     * @type {string}
     * @memberof StatsData
     */
    totalVolume?: string;
    /**
     * Total (in RUNE Value) of all assets swapped in 24hrs
     * @type {string}
     * @memberof StatsData
     */
    totalVolume24hr?: string;
    /**
     * Total withdrawing transactions
     * @type {string}
     * @memberof StatsData
     */
    totalWithdrawTx?: string;
}
