import { MarketDataRealTime } from '@/marketData/http/MarketDataRealTime'
import { getStockMarketDataSocket } from '@/marketData/http/getStockMarketDataSocket'

let stockMarketDataRealTime: MarketDataRealTime

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
export const getUsEquityRealTime = (): MarketDataRealTime => {
  if (!stockMarketDataRealTime) {
    stockMarketDataRealTime = new MarketDataRealTime(getStockMarketDataSocket())
  }

  return stockMarketDataRealTime
}
