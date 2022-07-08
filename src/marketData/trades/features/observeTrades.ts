import {
  MarketDataRealTimeSubscriptionEntityType,
  MarketDataSourceType,
} from '@/marketData/types'
import { isCryptoMarketDataSource } from '@/marketData/helpers'
import {
  getCryptoMarketDataRealTime,
  getStockMarketDataRealTime,
} from '@/marketData/http'
import { Trade } from '@/marketData/trades/types'
import { cleanTrade } from '@/marketData/trades/helpers'
import throttle from 'lodash/throttle'
import { MarketDataSocketMessageHandler } from '@/marketData/http'

/**
 * @group Market Data
 * @category Trades
 * @param {MarketDataSourceType} marketDataSourceType - {@link cryptoMarketDataSource}, {@link stockMarketDataSource}, or {@link MarketDataClass}
 * @param {string} symbol
 * @param {(trade: Trade) => void} onTrade
 * @param {number} throttleMs - throttle trade updates to this many milliseconds
 */
export const observeTrades = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  onTrade: (trade: Trade) => void,
  throttleMs = 0,
) => {
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  let update: MarketDataSocketMessageHandler = (trade) =>
    onTrade(cleanTrade(trade as Trade, symbol))

  if (throttleMs > 0) {
    update = throttle((trade) => {
      onTrade(cleanTrade(trade as Trade, symbol))
    }, throttleMs)
  }

  return realTime.subscribeTo(
    MarketDataRealTimeSubscriptionEntityType.trade,
    symbol,
    update,
  )
}
