import { Calendar, CalendarRepository, RawCalendar } from '../types'
import { getTradeData } from '../../http'
import { cleanCalendar } from '../helpers'
import { formatISODate } from '../../../common'

/**
 * Gets calendars, if available, for a given date range.
 * @group Trading Data
 * @category Calendars
 * @example
 * ```ts
 * const calendars = await getCalendarsBetween(new Date('2022-07-01), new Date('2022-07-31'))
 * ```
 * @remarks If an {@link CalendarRepository} is provided, and no {@link Calendar} is found, the function WILL NOT fall back to HTTP.
 * @param {Date} start
 * @param {Date} end
 * @param {CalendarRepository} [calendarRepository] -  Provide an implementation of {@link CalendarRepository} to bypass HTTP request.
 * @returns {Promise<Calendar | undefined>} - when not found, returns undefined indicating the calendar is not available, e.g. 4th July 2022.
 */
export const getCalendarsBetween = (
  start: Date,
  end: Date,
  calendarRepository?: CalendarRepository,
): Promise<Calendar[]> => {
  if (calendarRepository) {
    return calendarRepository.findBetween(start, end)
  }
  return getTradeData<RawCalendar[]>('/calendar', {
    start: formatISODate(start),
    end: formatISODate(end),
  }).then((rawCalendars) => rawCalendars.map(cleanCalendar) as Calendar[])
}
