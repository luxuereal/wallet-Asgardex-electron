import * as RD from '@devexperts/remote-data-ts'
import { Client as BitcoinClient, Network as BitcoinNetwork } from '@thorchain/asgardex-bitcoin'
import { baseAmount } from '@thorchain/asgardex-util'
import { right, left } from 'fp-ts/lib/Either'
import * as FP from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as Rx from 'rxjs'
import { Observable, Observer } from 'rxjs'
import { map, mergeMap, catchError, shareReplay, startWith, distinctUntilChanged, debounceTime } from 'rxjs/operators'

import { AssetBTC } from '../../const'
import { BTC_DECIMAL } from '../../helpers/assetHelper'
import { envOrDefault } from '../../helpers/envHelper'
import { eqOString } from '../../helpers/fp/eq'
import { liveData } from '../../helpers/rx/liveData'
import { triggerStream } from '../../helpers/stateHelper'
import { network$ } from '../app/service'
import { ClientStateForViews } from '../types'
import { getClientStateForViews, getClient } from '../utils'
import { keystoreService } from '../wallet/service'
import { AssetWithBalanceRD, AssetWithBalance, AssetsWithBalanceRD, ApiError, ErrorId } from '../wallet/types'
import { getPhrase } from '../wallet/util'
import { BitcoinClientState } from './types'

const BITCOIN_ELECTRS_API = envOrDefault(process.env.BITCOIN_ELECRTS_TESTNET_API, 'http://165.22.106.224')

/**
 * Binance network depending on `Network`
 */
const bitcoinNetwork$: Observable<BitcoinNetwork> = network$.pipe(
  mergeMap((network) => {
    if (network === 'testnet') return Rx.of(BitcoinNetwork.TEST)
    // In case of 'chaosnet' + 'mainnet` use BitcoinNetwork.MAIN
    return Rx.of(BitcoinNetwork.MAIN)
  })
)

/**
 * Stream to create an observable BitcoinClient depending on existing phrase in keystore
 *
 * Whenever a phrase has been added to keystore, a new BitcoinClient will be created.
 * By the other hand: Whenever a phrase has been removed, the client is set to `none`
 * A BitcoinClient will never be created as long as no phrase is available
 */
const clientState$ = Rx.combineLatest([keystoreService.keystore$, bitcoinNetwork$]).pipe(
  mergeMap(
    ([keystore, bitcoinNetwork]) =>
      Observable.create((observer: Observer<BitcoinClientState>) => {
        const client: BitcoinClientState = FP.pipe(
          getPhrase(keystore),
          O.chain((phrase) => {
            try {
              const client = new BitcoinClient(bitcoinNetwork, BITCOIN_ELECTRS_API, phrase)
              return O.some(right(client)) as BitcoinClientState
            } catch (error) {
              return O.some(left(error))
            }
          })
        )
        observer.next(client)
      }) as Observable<BitcoinClientState>
  )
)

export type ClientState = typeof clientState$

const client$: Observable<O.Option<BitcoinClient>> = clientState$.pipe(map(getClient), shareReplay(1))

/**
 * Helper stream to provide "ready-to-go" state of latest `BitcoinClient`, but w/o exposing the client
 * It's needed by views only.
 */
const clientViewState$: Observable<ClientStateForViews> = clientState$.pipe(
  map((clientState) => getClientStateForViews(clientState))
)

/**
 * Current `Address` depending on selected network
 *
 * If a client is not available (e.g. by removing keystore), it returns `None`
 *
 */
const address$: Observable<O.Option<string>> = client$.pipe(
  map(FP.pipe(O.chain((client) => O.some(client.getAddress())))),
  distinctUntilChanged(eqOString.equals),
  shareReplay(1)
)

/**
 * Observable to load balances from Binance API endpoint
 * If client is not available, it returns an `initial` state
 */
const loadBalances$ = (client: BitcoinClient): Observable<AssetWithBalanceRD> =>
  Rx.from(client.getBalance()).pipe(
    mergeMap((balance) =>
      Rx.of(
        RD.success({
          asset: AssetBTC,
          amount: baseAmount(balance, BTC_DECIMAL),
          frozenAmount: O.none
        } as AssetWithBalance)
      )
    ),
    catchError((error: Error) =>
      Rx.of(RD.failure({ apiId: 'BTC', errorId: ErrorId.GET_BALANCES, msg: error?.message ?? '' } as ApiError))
    ),
    startWith(RD.pending)
  )

// `TriggerStream` to reload `Balances`
const { stream$: reloadBalances$, trigger: reloadBalances } = triggerStream()

/**
 * State of `Balance`s provided as `AssetsWithBalanceRD`
 *
 * Data will be loaded by first subscription only
 * If a client is not available (e.g. by removing keystore), it returns an `initial` state
 */
const assetWB$: Observable<AssetWithBalanceRD> = Rx.combineLatest(
  reloadBalances$.pipe(debounceTime(300)),
  client$
).pipe(
  mergeMap(([_, client]) => {
    return FP.pipe(
      client,
      O.fold(
        // if a client is not available, "reset" state to "initial"
        () => Rx.of(RD.initial),
        // or start request and return state
        loadBalances$
      )
    )
  }),
  // cache it to avoid reloading data by every subscription
  shareReplay(1)
)

// Map `AssetWB` into `[AssetsWB]` - needed
const assetsWB$: Observable<AssetsWithBalanceRD> = assetWB$.pipe(liveData.map((asset) => [asset]))

/**
 * Object with all "public" functions and observables
 */
export { client$, clientViewState$, address$, reloadBalances, assetsWB$ }
