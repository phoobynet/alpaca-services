import { addBusinessDays } from 'date-fns'
import { getCalendarsBetween } from '@/tradingData/calendars/features'
import { Calendar, CalendarRepository } from '@/tradingData/calendars/types'
import first from 'lodash/first'

/**
 * Get the next calendar
 * @group Trading Data
 * @category Calendars
 * @example
 * ```ts
 * const calendar = await getNextCalendar()
 * ```
 * @remarks If an {@link CalendarRepository} is provided, and no {@link Calendar} is found, the function WILL NOT fall back to HTTP.
 * @param {Date} [date] - if not provided, the current date is used
 * @param {CalendarRepository} [calendarRepository] -  Provide an implementation of {@link CalendarRepository} to bypass HTTP request.  This can be set globally in {@link Option}
 * @param {boolean} forceHttp - bypass calendarRepository and force HTTP request
 * @returns {Promise<Calendar>} - should always return a valid date.
 * @throws {Error} - when no calendar is found throws 'Expected to find a next calendar, but nothing was found' error.
 */
export const getNextCalendar = async (
  date: Date = new Date(),
  calendarRepository?: CalendarRepository,
  forceHttp = false,
): Promise<Calendar> => {
  const nextCalendar = await getCalendarsBetween(
    addBusinessDays(date, 1),
    addBusinessDays(date, 5),
    calendarRepository,
    forceHttp,
  ).then(first)

  if (!nextCalendar) {
    throw new Error('Expected to find a next calendar, but nothing was found')
  }

  return nextCalendar
}
