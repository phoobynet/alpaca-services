import { MarketStatusDuration } from '@/tradingData/marketStatus/types/marketStatusDuration'
import { MarketStatus } from '@/tradingData/marketStatus/types/marketStatus'
import { Calendar } from '@/tradingData/calendars/types'

/**
 * @group Trading Data
 * @category Market Status
 */
export interface MarketStatusUpdate {
  localTime: string
  marketTime: string
  status: MarketStatus
  nextActiveStatus: MarketStatus
  timeUntilNextActiveStatus: MarketStatusDuration
  currentCalendar?: Calendar
  previousCalendar: Calendar
  nextCalendar: Calendar
}
