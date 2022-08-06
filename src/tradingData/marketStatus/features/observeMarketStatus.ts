import { MarketStatusHandler } from '@/tradingData/marketStatus/types/marketStatusHandler'
import { CancelFn } from '@/types'
import { getMarketStatus } from '@/tradingData'

/**
 * @group Trading Data
 * @category Market Status
 */
export const observeMarketStatus = (
  handler: MarketStatusHandler,
  intervalMS = 1_000,
): CancelFn => {
  let interval: ReturnType<typeof setInterval>

  setInterval(async () => {
    handler(await getMarketStatus())
  }, intervalMS)

  return () => {
    clearInterval(interval)
  }
}
