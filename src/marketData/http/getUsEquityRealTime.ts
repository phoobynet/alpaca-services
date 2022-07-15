import { MarketDataRealTime } from './MarketDataRealTime'
import { getStockMarketDataSocket } from './getStockMarketDataSocket'

let stockMarketDataRealTime: MarketDataRealTime

export const getUsEquityRealTime = (): MarketDataRealTime => {
  if (!stockMarketDataRealTime) {
    stockMarketDataRealTime = new MarketDataRealTime(getStockMarketDataSocket())
  }

  return stockMarketDataRealTime
}
