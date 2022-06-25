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
import { cleanBar } from '../helpers'
import { cleanSymbol } from '../../../common'

export const observeBars = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  handler: (nextBar: Bar) => void,
): (() => void) => {
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  symbol = cleanSymbol(symbol)

  return realTime.subscribeTo(SubEntityType.bar, symbol, (message: unknown) => {
    handler(cleanBar(message as Bar, symbol))
  })
}
