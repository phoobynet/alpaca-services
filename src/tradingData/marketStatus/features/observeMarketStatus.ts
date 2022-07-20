import { MarketStatusHandler } from '@/tradingData/marketStatus/types/marketStatusHandler'
import { getMarketStatus } from '@/tradingData/marketStatus/features/getMarketStatus'
import { CancelFn } from '@/types'

const UPDATE_INTERVAL = 1_000
const handlers = new Map<MarketStatusHandler, void>()
let updateInterval: ReturnType<typeof setInterval>

/**
 * @group Trading Data
 * @category Market Status
 */
export const observeMarketStatus = (handler: MarketStatusHandler): CancelFn => {
  if (!updateInterval) {
    updateInterval = setInterval(async () => {
      const currentMarketStatus = await getMarketStatus()
      for (const handler of Array.from(handlers.keys())) {
        handler(currentMarketStatus)
      }
    }, UPDATE_INTERVAL)
  }

  handlers.set(handler)

  return () => {
    handlers.delete(handler)

    if (handlers.size === 0) {
      clearInterval(updateInterval)
    }
  }
}
