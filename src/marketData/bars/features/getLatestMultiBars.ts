import { Bar } from '../types'
import { MarketDataSource } from '../../types'
import { getMarketDataPagedMultiObject } from '../../http'
import { cleanLatestMultiBars } from '../helpers'
import {
  isCryptoMarketDataSource,
  isStockMarketDataSource,
} from '../../helpers'
import { LatestMultiBarsArgs } from '../types'
import { cleanString, cleanSymbols } from '../../../helpers'

/**
 * @group Market Data
 * @category Bar
 * @param {MarketDataSource} marketDataSource
 * @param {LatestMultiBarsArgs} args
 */
export const getLatestMultiBars = async (
  marketDataSource: MarketDataSource,
  args: LatestMultiBarsArgs,
): Promise<Record<string, Bar>> => {
  if (args.symbols.length === 0) {
    throw new Error('symbols is empty')
  }

  const symbols = cleanSymbols(args.symbols)
  const exchange = cleanString(args.exchange)
  const feed = cleanString(args.feed)
  const queryParams: Record<string, string> = {}

  queryParams.symbols = symbols.join(',')

  // noinspection DuplicatedCode
  if (isCryptoMarketDataSource(marketDataSource)) {
    if (!exchange) {
      throw new Error('Exchange is required for crypto market data')
    }

    if (feed) {
      throw new Error('Feed should not be provided for crypto market data')
    }

    queryParams.exchange = exchange
  } else if (isStockMarketDataSource(marketDataSource)) {
    if (exchange) {
      throw new Error('Exchange should not be provided for stock market data')
    }

    if (feed) {
      queryParams.feed = feed
    }
  }

  return getMarketDataPagedMultiObject(
    marketDataSource,
    '/bars/latest',
    queryParams,
  ).then(cleanLatestMultiBars)
}
