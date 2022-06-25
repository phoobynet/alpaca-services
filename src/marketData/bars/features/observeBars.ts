import {
  getCryptoMarketDataRealTime,
  getStockMarketDataRealTime,
} from '../../http'
import {
  MarketDataRealTimeSubscriptionEntityType as SubEntityType,
  MarketDataSourceType,
} from '../../types'
import { Bar } from '../types'
import { isCryptoMarketDataSource } from '../../helpers'

export const observeBars = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  handler: (nextBar: Bar) => void,
): (() => void) => {
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  return realTime.subscribeTo(SubEntityType.bar, symbol, (message: unknown) => {
    handler(message as Bar)
  })
}
