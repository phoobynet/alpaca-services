import { MarketStatusCancel, MarketStatusHandler } from '../types'
import { getMarketStatus } from './getMarketStatus'

const UPDATE_INTERVAL = 1_000
const handlers = new Map<MarketStatusHandler, void>()
let updateInterval: ReturnType<typeof setInterval>

export const observeMarketStatus = (
  handler: MarketStatusHandler,
): MarketStatusCancel => {
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
