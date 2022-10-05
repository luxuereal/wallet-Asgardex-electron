// tslint:disable
/**
 * Thornode API
 * Thornode REST API.
 *
 * The version of the OpenAPI document: 1.97.2
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpQuery, throwIfNullOrUndefined, encodeURI } from '../runtime';
import {
    BanResponse,
    ConstantsResponse,
    LastBlock,
    NetworkResponse,
    VersionResponse,
} from '../models';

export interface BanRequest {
    address: string;
    height?: number;
}

export interface ConstantsRequest {
    height?: number;
}

export interface InboundAddressesRequest {
    height?: number;
}

export interface LastblockRequest {
    height?: number;
}

export interface LastblockChainRequest {
    chain: string;
    height?: number;
}

export interface NetworkRequest {
    height?: number;
}

export interface RagnarokRequest {
    height?: number;
}

export interface VersionRequest {
    height?: number;
}

/**
 * no description
 */
export class NetworkApi extends BaseAPI {

    /**
     * Returns the ban status for the provided node address.
     */
    ban = ({ address, height }: BanRequest): Observable<BanResponse> => {
        throwIfNullOrUndefined(address, 'ban');

        const query: HttpQuery = {};

        if (height != null) { query['height'] = height; }

        return this.request<BanResponse>({
            path: '/thorchain/ban/{address}'.replace('{address}', encodeURI(address)),
            method: 'GET',
            query,
        });
    };

    /**
     * Returns constant configuration, can be overridden by mimir.
     */
    constants = ({ height }: ConstantsRequest): Observable<ConstantsResponse> => {

        const query: HttpQuery = {};

        if (height != null) { query['height'] = height; }

        return this.request<ConstantsResponse>({
            path: '/thorchain/constants',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns the set of asgard addresses that should be used for inbound transactions.
     */
    inboundAddresses = ({ height }: InboundAddressesRequest): Observable<Array<object>> => {

        const query: HttpQuery = {};

        if (height != null) { query['height'] = height; }

        return this.request<Array<object>>({
            path: '/thorchain/inbound_addresses',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns the last block information for all chains.
     */
    lastblock = ({ height }: LastblockRequest): Observable<Array<LastBlock>> => {

        const query: HttpQuery = {};

        if (height != null) { query['height'] = height; }

        return this.request<Array<LastBlock>>({
            path: '/thorchain/lastblock',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns the last block information for the provided chain.
     */
    lastblockChain = ({ chain, height }: LastblockChainRequest): Observable<Array<LastBlock>> => {
        throwIfNullOrUndefined(chain, 'lastblockChain');

        const query: HttpQuery = {};

        if (height != null) { query['height'] = height; }

        return this.request<Array<LastBlock>>({
            path: '/thorchain/lastblock/{chain}'.replace('{chain}', encodeURI(chain)),
            method: 'GET',
            query,
        });
    };

    /**
     * Returns network overview statistics.
     */
    network = ({ height }: NetworkRequest): Observable<NetworkResponse> => {

        const query: HttpQuery = {};

        if (height != null) { query['height'] = height; }

        return this.request<NetworkResponse>({
            path: '/thorchain/network',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns a boolean indicating whether the chain is in ragnarok.
     */
    ragnarok = ({ height }: RagnarokRequest): Observable<boolean> => {

        const query: HttpQuery = {};

        if (height != null) { query['height'] = height; }

        return this.request<boolean>({
            path: '/thorchain/ragnarok',
            method: 'GET',
            query,
        });
    };

    /**
     * Returns the network\'s current THORNode version, the network\'s next THORNode version, and the querier\'s THORNode version.
     */
    version = ({ height }: VersionRequest): Observable<VersionResponse> => {

        const query: HttpQuery = {};

        if (height != null) { query['height'] = height; }

        return this.request<VersionResponse>({
            path: '/thorchain/version',
            method: 'GET',
            query,
        });
    };

}
