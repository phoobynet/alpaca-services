import { MarketStatusDuration } from './marketStatusDuration'
import { MarketStatus } from './marketStatus'
import { Calendar } from '../../calendars'

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
