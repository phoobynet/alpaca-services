import {
  Calendar,
  getCalendarForToday,
  getPreviousCalendar,
} from '@/tradingData'

/**
 * @group Trading Data
 * @category Calendars
 */
export const getCurrentOrPreviousCalendar = async (): Promise<Calendar> => {
  const calendar = await getCalendarForToday()

  if (calendar) {
    return calendar
  }

  return getPreviousCalendar()
}
