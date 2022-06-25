import {
  getCryptoMarketDataRealTime,
  getStockMarketDataRealTime,
} from '../../http'
import { MarketDataRealTimeSubscriptionEntityType as SubEntityType } from '../../types'
import { Bar, MarketDataSourceType } from '../types'
import { isCryptoMarketDataSource } from '../../helpers'

export const observeBars = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  handler: (nextBar: Bar) => void,
): (() => void) => {
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  const cancel = realTime.subscribeTo(
    SubEntityType.bar,
    symbol,
    (message: unknown) => {
      handler(message as Bar)
    },
  )

  return () => {
    cancel()
  }
}
