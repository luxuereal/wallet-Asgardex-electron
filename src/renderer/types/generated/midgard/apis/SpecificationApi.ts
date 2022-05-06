// tslint:disable
/**
 * Midgard Public API
 * The Midgard Public API queries THORChain and any chains linked via the Bifröst and prepares information about the network to be readily available for public users. The API parses transaction event data from THORChain and stores them in a time-series database to make time-dependent queries easy. Midgard does not hold critical information. To interact with BEPSwap and Asgardex, users should query THORChain directly.
 *
 * The version of the OpenAPI document: 2.6.9
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI } from '../runtime';

/**
 * no description
 */
export class SpecificationApi extends BaseAPI {

    /**
     * Swagger/OpenAPI 3.0 specification generated documents.
     * Documentation
     */
    getDocs = (): Observable<void> => {
        return this.request<void>({
            path: '/v2/doc',
            method: 'GET',
        });
    };

    /**
     * Returns human and machine readable swagger/openapi specification
     * Swagger File
     */
    getSwagger = (): Observable<void> => {
        return this.request<void>({
            path: '/v2/swagger.json',
            method: 'GET',
        });
    };

}
