import { Calendar } from '@/tradingData/calendars/types'
import { getCalendarsBetween } from '@/tradingData/calendars/features'
import { subBusinessDays } from 'date-fns'
import last from 'lodash/last'

/**
 * Get the previous calendar
 * @group Trading Data
 * @category Calendars
 * @example
 * ```ts
 * const calendar = await getPreviousCalendar()
 * ```
 * @remarks If an {@link CalendarRepository} is provided, and no {@link Calendar} is found, the function WILL NOT fall back to HTTP.
 * @param {Date} [date] - if not provided, the current date is used
 * @param {boolean} forceHttp - bypass calendarRepository and force HTTP request
 * @returns {Promise<Calendar>} - should always return a valid date.
 * @throws {Error} - when no calendar is found throws 'Expected to find a previous calendar, but nothing was found' error.
 */
export const getPreviousCalendar = async (
  date: Date = new Date(),
  forceHttp = false,
): Promise<Calendar> => {
  const start = subBusinessDays(date, 5)
  const end = subBusinessDays(date, 1)

  const previousCalendar = await getCalendarsBetween(
    start,
    end,
    forceHttp,
  ).then(last)

  if (!previousCalendar) {
    throw new Error(
      'Expected to find a previous calendar, but nothing was found',
    )
  }

  return previousCalendar
}
