import {
  getCryptoMarketDataRealTime,
  getStockMarketDataRealTime,
} from '@/marketData/http'
import {
  MarketDataRealTimeSubscriptionEntityType as SubEntityType,
  MarketDataSourceType,
} from '@/marketData/types'
import { Bar } from '@/marketData/bars/types'
import { isCryptoMarketDataSource } from '@/marketData/helpers'
import { cleanBar } from '@/marketData/bars/helpers'

export const observeBars = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  handler: (nextBar: Bar) => void,
): (() => void) => {
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  return realTime.subscribeTo(SubEntityType.bar, symbol, (message: unknown) => {
    handler(cleanBar(message as Bar, symbol))
  })
}
