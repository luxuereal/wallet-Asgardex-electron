import React from 'react'

import { storiesOf } from '@storybook/react'
import { bn } from '@thorchain/asgardex-util'
import * as O from 'fp-ts/lib/Option'

import { getTickerFormat } from '../../../helpers/stringHelper'
import { AssetPair } from '../../../types/asgardex'
import CoinData from '../coins/coinData'
import FilterMenu from './FilterMenu'

const filterFunction = (item: AssetPair, searchTerm: string) =>
  O.toNullable(getTickerFormat(item.asset))?.indexOf(searchTerm.toLowerCase()) === 0 ?? false

const cellRenderer = (data: AssetPair) => {
  const { asset: key, price } = data
  const tokenName = O.toNullable(getTickerFormat(key)) || ''
  const node = <CoinData asset={tokenName} price={price} />
  return { key, node }
}

storiesOf('Components/FilterMenu', module).add('coins example', () => {
  return (
    <FilterMenu
      searchEnabled
      filterFunction={filterFunction}
      cellRenderer={cellRenderer}
      asset="TOMOB-1E1"
      data={[
        { asset: 'FSN-F1B', price: bn(1) },
        { asset: 'FTM-585', price: bn(1) },
        { asset: 'LOK-3C0', price: bn(0) },
        { asset: 'TCAN-014', price: bn(1) },
        { asset: 'TOMOB-1E1', price: bn(1) },
        { asset: 'BNB', price: bn(0.00387) }
      ]}
    />
  )
})
storiesOf('Components/FilterMenu', module).add('general use', () => {
  return (
    <FilterMenu
      searchEnabled
      filterFunction={filterFunction}
      cellRenderer={({ asset }) => ({
        key: `${Math.random()}-name`,
        node: <div>{asset}</div>
      })}
      asset="paul"
      data={[
        { asset: 'John', price: bn(1) },
        { asset: 'Paul', price: bn(2) },
        { asset: 'George', price: bn(3) },
        { asset: 'Ringo', price: bn(4) }
      ]} // AssetPair[]
    />
  )
})
