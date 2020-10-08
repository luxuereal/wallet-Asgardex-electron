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
 * @interface BondMetrics
 */
export interface BondMetrics {
    /**
     * Average bond of active nodes
     * @type {string}
     * @memberof BondMetrics
     */
    averageActiveBond?: string;
    /**
     * Average bond of standby nodes
     * @type {string}
     * @memberof BondMetrics
     */
    averageStandbyBond?: string;
    /**
     * Maxinum bond of active nodes
     * @type {string}
     * @memberof BondMetrics
     */
    maximumActiveBond?: string;
    /**
     * Maximum bond of standby nodes
     * @type {string}
     * @memberof BondMetrics
     */
    maximumStandbyBond?: string;
    /**
     * Median bond of active nodes
     * @type {string}
     * @memberof BondMetrics
     */
    medianActiveBond?: string;
    /**
     * Median bond of standby nodes
     * @type {string}
     * @memberof BondMetrics
     */
    medianStandbyBond?: string;
    /**
     * Minumum bond of active nodes
     * @type {string}
     * @memberof BondMetrics
     */
    minimumActiveBond?: string;
    /**
     * Minumum bond of standby nodes
     * @type {string}
     * @memberof BondMetrics
     */
    minimumStandbyBond?: string;
    /**
     * Total bond of active nodes
     * @type {string}
     * @memberof BondMetrics
     */
    totalActiveBond?: string;
    /**
     * Total bond of standby nodes
     * @type {string}
     * @memberof BondMetrics
     */
    totalStandbyBond?: string;
}
