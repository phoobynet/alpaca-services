import { MarketDataRealTime } from '@/marketData/http/MarketDataRealTime'
import { getUsEquitySocket } from '@/marketData/http/getUsEquitySocket'

let realTime: MarketDataRealTime

/**
 * @internal
 * @group Market Data
 * @category HTTP
 */
export const getUsEquityRealTime = async (): Promise<MarketDataRealTime> => {
  if (!realTime) {
    realTime = new MarketDataRealTime(await getUsEquitySocket())
  }

  return realTime
}
