import { getCalendarsBetween } from './getCalendarsBetween'
import { Calendar, CalendarRepository } from '../types'
import { isDateEqual } from '../../../helpers'

/**
 * Get a calendar, if available, for a given date
 * @group Trading Data
 * @category Calendars
 * @example
 * ```ts
 * const calendar = await getCalendarFor(new Date('2022-07-01))
 * ```
 * @remarks If an {@link CalendarRepository} is provided, and no {@link Calendar} is found, the function WILL NOT fall back to HTTP.
 * @param {Date} date
 * @param {CalendarRepository} [calendarRepository] -  Provide an implementation of {@link CalendarRepository} to bypass HTTP request.
 * @returns {Promise<Calendar | undefined>} - when not found, returns undefined indicating the calendar is not available, e.g. 4th July 2022.
 */
export const getCalendarFor = async (
  date: Date,
  calendarRepository?: CalendarRepository,
): Promise<Calendar | undefined> => {
  if (calendarRepository) {
    return calendarRepository.find(date)
  }

  // when no calendars for a given date are found, the next trading date is returned
  // this is not the desired behavior

  const calendars = await getCalendarsBetween(date, date, calendarRepository)
  return calendars.find((calendar) => isDateEqual(calendar.date, date))
}
