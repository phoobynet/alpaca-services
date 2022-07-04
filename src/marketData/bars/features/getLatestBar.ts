import { Bar, RawBar } from '../types'
import { cleanBar } from '../helpers'
import { ArgumentValidationError, cleanSymbol } from '../../../common'
import { MarketDataFeed, MarketDataSource } from '../../types'
import {
  isCryptoMarketDataSource,
  isStockMarketDataSource,
} from '../../helpers'

export type LatestBarArgs = {
  symbol: string
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
 * @param {LatestBarArgs} args
 */
export const getLatestBar = (
  marketDataSource: MarketDataSource,
  args: LatestBarArgs,
): Promise<Bar> => {
  const exchange = (args.exchange || '').trim()
  const feed = (args.feed || '').trim()
  const symbol = cleanSymbol(args.symbol)
  const queryParams: Record<string, string> = {}

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

  return marketDataSource
    .get<RawBar>(`/${symbol}/bars/latest`, queryParams)
    .then(cleanBar)
}
