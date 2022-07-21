import { MarketDataRealTime } from '@/marketData'
import { getNewsSocket } from '@/marketData/http/getNewsSocket'

let realTime: MarketDataRealTime

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
export const getNewsRealTime = (): MarketDataRealTime => {
  if (!realTime) {
    realTime = new MarketDataRealTime(getNewsSocket())
  }

  return realTime
}
