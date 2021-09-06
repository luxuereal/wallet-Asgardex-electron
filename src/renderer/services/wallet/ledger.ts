import * as RD from '@devexperts/remote-data-ts'
import { Chain } from '@xchainjs/xchain-util'
import * as FP from 'fp-ts/lib/function'
import * as Rx from 'rxjs'
import * as RxOp from 'rxjs/operators'

import { Network } from '../../../shared/api/types'
import { eqLedgerAddressMap } from '../../helpers/fp/eq'
import { observableState } from '../../helpers/stateHelper'
import { INITIAL_LEDGER_ADDRESSES_MAP } from './const'
import {
  KeystoreState,
  KeystoreState$,
  LedgerAddressesMap,
  LedgerAddressLD,
  LedgerAddressRD,
  LedgerService
} from './types'
import { hasImportedKeystore } from './util'

export const createLedgerService = ({ keystore$ }: { keystore$: KeystoreState$ }): LedgerService => {
  // State of all added Ledger addresses
  const {
    get$: ledgerAddresses$,
    get: ledgerAddresses,
    set: setLedgerAddresses
  } = observableState<LedgerAddressesMap>(INITIAL_LEDGER_ADDRESSES_MAP)

  const setLedgerAddressRD = ({
    addressRD,
    chain,
    network
  }: {
    addressRD: LedgerAddressRD
    chain: Chain
    network: Network
  }) => {
    const addresses = ledgerAddresses()
    // TODO(@asgdx-team) Let's think about to use `immer` or similar library for deep, immutable state changes
    return setLedgerAddresses({ ...addresses, [chain]: { ...addresses[chain], [network]: addressRD } })
  }

  /**
   * Get ledger address from memory
   */
  const getLedgerAddress$ = (chain: Chain, network: Network): LedgerAddressLD =>
    FP.pipe(
      ledgerAddresses$,
      RxOp.map((addressesMap) => addressesMap[chain]),
      RxOp.distinctUntilChanged(eqLedgerAddressMap.equals),
      RxOp.map((addressMap) => addressMap[network])
    )

  /**
   * Removes ledger address from memory
   */
  const removeLedgerAddress = (chain: Chain, network: Network): void =>
    setLedgerAddressRD({
      addressRD: RD.initial,
      chain,
      network
    })

  /**
   * Sets ledger address in `pending` state
   */
  const setPendingLedgerAddress = (chain: Chain, network: Network): void =>
    setLedgerAddressRD({
      addressRD: RD.pending,
      chain,
      network
    })

  /**
   * Ask Ledger to get address from it
   */
  const askLedgerAddress$ = (chain: Chain, network: Network): LedgerAddressLD =>
    FP.pipe(
      // remove address from memory
      removeLedgerAddress(chain, network),
      // set pending
      () => setPendingLedgerAddress(chain, network),
      // ask for ledger address
      () => Rx.from(window.apiHDWallet.getLedgerAddress(chain, network)),
      RxOp.map(RD.fromEither),
      // store address in memory
      RxOp.tap((addressRD: LedgerAddressRD) => setLedgerAddressRD({ chain, addressRD, network })),
      RxOp.catchError((error) => Rx.of(RD.failure(error))),
      RxOp.startWith(RD.pending)
    )

  // Whenever keystore has been removed, reset all stored ledger addresses
  const keystoreSub = keystore$.subscribe((keystoreState: KeystoreState) => {
    if (!hasImportedKeystore(keystoreState)) {
      setLedgerAddresses(INITIAL_LEDGER_ADDRESSES_MAP)
    }
  })

  const dispose = () => {
    keystoreSub.unsubscribe()
    setLedgerAddresses(INITIAL_LEDGER_ADDRESSES_MAP)
  }

  return { askLedgerAddress$, getLedgerAddress$, removeLedgerAddress, dispose }
}