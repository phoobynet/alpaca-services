import { MarketDataRealTime } from './MarketDataRealTime'
import { getStockMarketDataSocket } from './getStockMarketDataSocket'

let stockMarketDataRealTime: MarketDataRealTime

export const getStockMarketDataRealTime = (): MarketDataRealTime => {
  if (!stockMarketDataRealTime) {
    stockMarketDataRealTime = new MarketDataRealTime(getStockMarketDataSocket())
  }

  return stockMarketDataRealTime
}
