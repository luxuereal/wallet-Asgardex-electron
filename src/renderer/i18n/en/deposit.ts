import { DepositMessages } from '../types'

const deposit: DepositMessages = {
  'deposit.interact.title': 'Deposit',
  'deposit.interact.subtitle': 'Interact with THORchain',
  'deposit.interact.actions': 'Available actions',
  'deposit.interact.actions.bond': 'Bond',
  'deposit.interact.actions.unbond': 'Unbond',
  'deposit.interact.actions.leave': 'Leave',
  'deposit.interact.actions.custom': 'Custom',
  'deposit.share.title': 'Your pool share',
  'deposit.share.units': 'Liquidity units',
  'deposit.share.total': 'Total value',
  'deposit.share.poolshare': 'Pool share',
  'deposit.redemption.title': 'Current redemption value',
  'deposit.totalEarnings': 'Your total earnings from the pool',
  'deposit.add.asym': 'Add {asset}',
  'deposit.add.sym': 'Add',
  'deposit.add.state.sending': 'Send deposit transaction',
  'deposit.add.state.checkResults': 'Check deposit result',
  'deposit.add.state.pending': 'Adding liquidity',
  'deposit.add.state.success': 'Successful deposit',
  'deposit.add.state.error': 'Deposit error',
  'deposit.add.error.chainFeeNotCovered': 'Needed fee of {fee} is not covered by your balance: {balance}',
  'deposit.add.error.nobalances': 'No balances',
  'deposit.add.error.nobalance1': "You don't have any balance of {asset} in your wallet to deposit.",
  'deposit.add.error.nobalance2': "You don't have any balances of {asset1} and {asset2} in your wallet to deposit.",
  'deposit.add.pendingAssets.title': 'Pending assets found',
  'deposit.add.pendingAssets.description':
    'Following assets have been successfully sent, but the transaction of the other asset side has not been finalized or it was failed:',
  'deposit.add.pendingAssets.recoveryDescription':
    'Please note: Transactions of an asset pair might take different time by running on different blockchains. In case of failures, you have a way to withdraw pending assets using the Recovery Tool of THORSWap at {url}. This feature is currently not available in ASGARDEX desktop.',
  'deposit.add.pendingAssets.recoveryTitle': 'Open Recovery Tool',
  'deposit.add.asymAssets.title': 'Asymmetrical deposit found',
  'deposit.add.asymAssets.description':
    'Adding an asset pair symmetrical has been disabled due a previous asymmetrical deposit of following asset(s):',
  'deposit.add.asymAssets.recoveryDescription':
    'Asymmetrical deposit is currently not supported in ASGARDEX desktop. However, you can use this feature in THORSwap to withdraw a previous asymmetrical deposit.',
  'deposit.add.asymAssets.recoveryTitle': 'THORSwap',
  'deposit.add.assetMissmatch.title': 'Asset missmatch found',
  'deposit.add.assetMissmatch.description':
    'One of current selected asset side has been already used in a previous deposit, but with another asset. Check following addresses to see the previous deposit pair.',
  'deposit.bond.state.error': 'Bond error',
  'deposit.unbond.state.error': 'Unbond error',
  'deposit.leave.state.error': 'Leave error',
  'deposit.advancedMode': 'Advanced mode',
  'deposit.poolDetails.depth': 'Depth',
  'deposit.poolDetails.24hvol': '24hr volume',
  'deposit.poolDetails.allTimeVal': 'All time volume',
  'deposit.poolDetails.totalSwaps': 'Total swaps',
  'deposit.poolDetails.totalUsers': 'Total users',
  'deposit.poolDetails.volumeTotal': 'Volume (total)',
  'deposit.poolDetails.earnings': 'Earnings',
  'deposit.poolDetails.ilpPaid': 'ILP paid',
  'deposit.poolDetails.totalTx': 'Txs (total)',
  'deposit.poolDetails.totalFees': 'Fees (total)',
  'deposit.poolDetails.members': 'Members',
  'deposit.poolDetails.apy': 'APY',
  'deposit.wallet.add': 'Add wallet',
  'deposit.wallet.connect': 'Please connect your wallet',
  'deposit.pool.noShares': "You don't have shares in this pool",
  'deposit.withdraw.sym': 'Withdraw',
  'deposit.withdraw.asym': 'Withdraw {asset}',
  'deposit.withdraw.sym.title': 'Adjust withdrawal (symmetrical)',
  'deposit.withdraw.asym.title': 'Adjust withdrawal (asymmetrical)',
  'deposit.withdraw.pending': 'Withdraw',
  'deposit.withdraw.success': 'Successful withdraw',
  'deposit.withdraw.error': 'Withdraw error',
  'deposit.withdraw.choseText': 'Choose from 0 to 100% of how much to withdraw.',
  'deposit.withdraw.fees': 'Transaction fee: {thorMemo}, Outbounding fees: {thorOut} + {assetOut}',
  'deposit.withdraw.feeNote': 'Note: {fee} BNB will be left in your wallet for the transaction fees.',
  'deposit.withdraw.error.feeNotCovered':
    'Transaction fee {fee} needs to be covered by your balance (currently {balance}).',
  'deposit.withdraw.ledger.sign': 'Click next to sign the withdraw transaction on your device.',
  'deposit.ledger.sign': 'Click next to sign the deposit transaction on your device.'
}

export default deposit
