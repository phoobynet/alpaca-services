import { Bar } from '../types'
import { MarketDataFeed, MarketDataSource } from '../../types'
import { getMarketDataPagedMultiObject } from '../../http'
import { ArgumentValidationError, cleanSymbol } from '../../../common'
import { cleanLatestMultiBars } from '../helpers'
import {
  isCryptoMarketDataSource,
  isStockMarketDataSource,
} from '../../helpers'

/**
 * @group Market Data
 * @category Bar
 */
export type LatestMultiBarsArgs = {
  symbols: string[]
  /**
   * Stock only
   */
  feed?: MarketDataFeed
  /**
   * Crypto only
   */
  exchange?: string
}

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
    throw new ArgumentValidationError('LatestMultiBarsArgs.symbols was empty')
  }
  const symbols = args.symbols.map(cleanSymbol)
  const exchange = (args.exchange || '').trim()
  const feed = (args.feed || '').trim()
  const queryParams: Record<string, string> = {}

  queryParams.symbols = symbols.join(',')

  // noinspection DuplicatedCode
  if (isCryptoMarketDataSource(marketDataSource)) {
    if (!exchange) {
      throw new ArgumentValidationError(
        'Exchange is required for crypto market data',
      )
    }

    if (feed) {
      throw new ArgumentValidationError(
        'Feed should not be provided for crypto market data',
      )
    }

    queryParams.exchange = exchange
  } else if (isStockMarketDataSource(marketDataSource)) {
    if (exchange) {
      throw new ArgumentValidationError(
        'Exchange should not be provided for stock market data',
      )
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
