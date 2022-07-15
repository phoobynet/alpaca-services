import { MarketDataRealTime } from '@/marketData/http/MarketDataRealTime'
import { getCryptoMarketDataSocket } from '@/marketData/http/getCryptoMarketDataSocket'

let cryptoMarketDataRealTime: MarketDataRealTime

/**
 * Provides a real time connection to Alpaca's crypto market data.
 * @internal
 * @group Market Data
 * @category HTTP
 */
export const getCryptoRealTime = () => {
  if (!cryptoMarketDataRealTime) {
    cryptoMarketDataRealTime = new MarketDataRealTime(
      getCryptoMarketDataSocket(),
    )
  }

  return cryptoMarketDataRealTime
}
