import {
  MarketDataRealTimeSubscriptionEntityType,
  MarketDataSourceType,
} from '../../types'
import { isCryptoMarketDataSource } from '../../helpers'
import {
  getCryptoMarketDataRealTime,
  getStockMarketDataRealTime,
} from '../../http'
import { cleanSymbol } from '../../../common'
import { Trade } from '../types'
import { cleanTrade } from '../helpers'

export const observeTrades = (
  marketDataSourceType: MarketDataSourceType,
  symbol: string,
  onTrade: (trade: Trade) => void,
) => {
  const realTime = isCryptoMarketDataSource(marketDataSourceType)
    ? getCryptoMarketDataRealTime()
    : getStockMarketDataRealTime()

  symbol = cleanSymbol(symbol)

  return realTime.subscribeTo(
    MarketDataRealTimeSubscriptionEntityType.trade,
    symbol,
    (trade) => {
      onTrade(cleanTrade(trade as Trade, symbol))
    },
  )
}
