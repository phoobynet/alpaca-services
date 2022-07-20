import { MarketStatusUpdate } from '@/tradingData/marketStatus/types/marketStatusUpdate'

/**
 * @group Trading Data
 * @category Market Status
 */
export interface MarketStatusHandler {
  (marketStatus: MarketStatusUpdate): void
}
