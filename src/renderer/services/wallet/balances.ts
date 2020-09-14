import * as RD from '@devexperts/remote-data-ts'
import * as A from 'fp-ts/lib/Array'
import * as FP from 'fp-ts/lib/function'
import * as NEA from 'fp-ts/lib/NonEmptyArray'
import * as O from 'fp-ts/lib/Option'
import * as Rx from 'rxjs'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

import { eqAssetsWithBalanceRD } from '../../helpers/fp/eq'
import { sequenceTOptionFromArray } from '../../helpers/fpHelpers'
import * as BNB from '../binance/service'
import * as BTC from '../bitcoin/service'
import { INITIAL_ASSETS_WB_STATE } from './const'
import { AssetsWithBalanceState } from './types'

const reloadBalances = () => {
  BTC.reloadBalances()
  BNB.reloadBalances()
}

const assetsWBState$: Observable<AssetsWithBalanceState> = Rx.combineLatest([BNB.assetsWB$, BTC.assetsWB$]).pipe(
  map((rdList) => ({
    assetsWB: FP.pipe(
      rdList,
      // filter results out
      // Transformation: RD<Error, AssetsWithBalance>`-> `AssetsWithBalance)[]`
      A.filterMap(RD.toOption),
      A.flatten,
      NEA.fromArray
    ),
    loading: FP.pipe(rdList, A.elem(eqAssetsWithBalanceRD)(RD.pending)),
    errors: FP.pipe(
      rdList,
      // filter errors out
      A.filter(RD.isFailure),
      // Transformation to get Errors out of RD:
      // `RemoteData<Error, never>[]` -> `RemoteData<never, Error>[]` -> `O.some(Error)[]`
      A.map(FP.flow(RD.recover(O.some), RD.toOption)),
      // Transformation: `O.some(Error)[]` -> `O.some(Error[])`
      sequenceTOptionFromArray,
      O.chain(NEA.fromArray)
    )
  })),
  startWith(INITIAL_ASSETS_WB_STATE)
)

export { reloadBalances, assetsWBState$ }
