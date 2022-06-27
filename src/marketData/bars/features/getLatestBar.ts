import { Bar, RawBar } from '../types'
import { cleanBar } from '../helpers'
import { cleanSymbol } from '../../../common'
import { MarketDataClass, MarketDataSource } from '../../types'

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
  if (marketDataSource.type === MarketDataClass.crypto && exchange === '') {
    throw new Error('Exchange is required for crypto market data')
  } else if (marketDataSource.type === MarketDataClass.stock && exchange) {
    throw new Error('Exchange should not be provided for stock market data')
  }

  const queryParams: Record<string, string> = {}

  if (exchange && marketDataSource.type === MarketDataClass.crypto) {
    queryParams.exchange = exchange
  }

  return marketDataSource
    .get<RawBar>(`/${cleanSymbol(symbol)}/bars/latest`, queryParams)
    .then(cleanBar)
}
