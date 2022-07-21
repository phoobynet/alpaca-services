import { MarketDataRealTime } from '@/marketData/http/MarketDataRealTime'
import { getCryptoSocket } from '@/marketData/http/getCryptoSocket'

let realTime: MarketDataRealTime

/**
 * Provides a real time connection to Alpaca's crypto market data.
 * @internal
 * @group Market Data
 * @category HTTP
 */
export const getCryptoRealTime = () => {
  if (!realTime) {
    realTime = new MarketDataRealTime(getCryptoSocket())
  }

  return realTime
}
