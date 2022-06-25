import { Bar, RawBar } from '../types'
import { cleanRawBar } from '../helpers'
import { cleanTimestamp } from '../../helpers'
import { cleanSymbol } from '../../../common'
import { MarketDataSource } from '../../types'

/**
 *
 * @param {MarketDataSource} marketDataSource
 * @param {string} symbol
 * @param {string} exchange - see https://alpaca.markets/docs/api-references/market-data-api/crypto-pricing-data/
 */
export const getLatestBar = (
  marketDataSource: MarketDataSource,
  symbol: string,
  exchange = '',
): Promise<Bar> => {
  if (marketDataSource.type === 'crypto' && exchange === '') {
    throw new Error('Exchange is required for crypto market data')
  }

  return marketDataSource<RawBar>(`/${cleanSymbol(symbol)}/bars/latest`, {
    exchange,
  })
    .then(cleanRawBar)
    .then(cleanTimestamp)
}
