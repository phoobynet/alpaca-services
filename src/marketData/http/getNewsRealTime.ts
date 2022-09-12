import { MarketDataRealTime } from '@/marketData'
import { getNewsSocket } from '@/marketData/http/getNewsSocket'

let realTime: MarketDataRealTime

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
export const getNewsRealTime = async (): Promise<MarketDataRealTime> => {
  if (!realTime) {
    realTime = new MarketDataRealTime(await getNewsSocket())
  }

  return realTime
}
