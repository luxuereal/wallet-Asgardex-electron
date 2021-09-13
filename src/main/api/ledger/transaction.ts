import TransportNodeHidSingleton from '@ledgerhq/hw-transport-node-hid-singleton'
import { TxHash } from '@xchainjs/xchain-client'
import { THORChain } from '@xchainjs/xchain-util'
import * as E from 'fp-ts/Either'

import { isError } from '../../../shared/api/guard'
import { IPCLedgerDepositTxParams, IPCLedgerSendTxParams } from '../../../shared/api/io'
import { LedgerErrorId } from '../../../shared/api/types'
import * as THOR from './thorchain/transaction'
import { getErrorId } from './utils'

export const sendTx = async ({
  chain,
  network,
  recipient,
  amount,
  memo
}: IPCLedgerSendTxParams): Promise<E.Either<LedgerErrorId, TxHash>> => {
  try {
    const transport = await TransportNodeHidSingleton.open()
    let res: E.Either<LedgerErrorId, string>
    switch (chain) {
      case THORChain:
        res = await THOR.send({ transport, network, recipient, amount, memo })
        break
      default:
        res = E.left(LedgerErrorId.NOT_IMPLEMENTED)
    }
    await transport.close()
    return res
  } catch (error) {
    return E.left(getErrorId(isError(error) ? error.message : ''))
  }
}

export const deposit = async ({
  chain,
  network,
  amount,
  memo
}: IPCLedgerDepositTxParams): Promise<E.Either<LedgerErrorId, TxHash>> => {
  try {
    const transport = await TransportNodeHidSingleton.open()
    let res: E.Either<LedgerErrorId, string>
    switch (chain) {
      case THORChain:
        res = await THOR.deposit({ transport, network, amount, memo })
        break
      default:
        res = E.left(LedgerErrorId.NOT_IMPLEMENTED)
    }
    await transport.close()
    return res
  } catch (error) {
    return E.left(getErrorId(isError(error) ? error.message : ''))
  }
}
