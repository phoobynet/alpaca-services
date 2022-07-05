import { Bar, LatestBarArgs, RawBar } from '../types'
import { cleanBar } from '../helpers'
import { MarketDataSource } from '../../types'
import {
  isCryptoMarketDataSource,
  isStockMarketDataSource,
} from '../../helpers'
import { cleanString, cleanSymbol } from '../../../helpers'

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
  const symbol = cleanSymbol(args.symbol)
  const exchange = cleanString(args.exchange)
  const feed = cleanString(args.feed)
  const queryParams: Record<string, string> = {}

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

  return marketDataSource
    .get<RawBar>(`/${symbol}/bars/latest`, queryParams)
    .then(cleanBar)
}
