import {
  MarketDataRealTimeSubscriptionEntityType,
  MarketDataSourceType,
} from '../../types'
import { isCryptoMarketDataSource } from '../../helpers'
import {
  getCryptoMarketDataRealTime,
  getStockMarketDataRealTime,
} from '../../http'
import { cleanSymbol } from '../../../helpers'
import { Trade } from '../types'
import { cleanTrade } from '../helpers'
import throttle from 'lodash/throttle'
import { MarketDataSocketMessageHandler } from '../../http'

export const observeTrades = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  onTrade: (trade: Trade) => void,
  throttleMs = 0,
) => {
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  symbol = cleanSymbol(symbol)

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
