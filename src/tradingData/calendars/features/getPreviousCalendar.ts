import { Calendar, CalendarRepository } from '@/tradingData/calendars/types'
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
 * @param {CalendarRepository} [calendarRepository] -  Provide an implementation of {@link CalendarRepository} to bypass HTTP request.  This can be set globally in {@link Option}
 * @returns {Promise<Calendar>} - should always return a valid date.
 * @throws {Error} - when no calendar is found throws 'Expected to find a previous calendar, but nothing was found' error.
 */
export const getPreviousCalendar = async (
  date: Date = new Date(),
  calendarRepository?: CalendarRepository,
): Promise<Calendar> => {
  const start = subBusinessDays(date, 5)
  const end = subBusinessDays(date, 1)

  const previousCalendar = await getCalendarsBetween(
    start,
    end,
    calendarRepository,
  ).then(last)

  if (!previousCalendar) {
    throw new Error(
      'Expected to find a previous calendar, but nothing was found',
    )
  }

  return previousCalendar
}
