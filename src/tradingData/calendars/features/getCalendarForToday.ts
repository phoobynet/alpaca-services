import { Calendar, CalendarRepository } from '../types'
import { getCalendarFor } from './getCalendarFor'

/**
 * Get a calendar, if available, for a the current date
 * @group Trading Data
 * @category Calendars
 * @example
 * ```ts
 * const calendar = await getCalendarToday()
 * ```
 * @remarks If an {@link CalendarRepository} is provided, and no {@link Calendar} is found, the function WILL NOT fall back to HTTP.
 * @param {CalendarRepository} [calendarRepository] -  Provide an implementation of {@link CalendarRepository} to bypass HTTP request.
 * @returns {Promise<Calendar | undefined>} - when not found, returns undefined indicating the calendar is not available, e.g. 4th July 2022.
 */
export const getCalendarForToday = async (
  calendarRepository?: CalendarRepository,
): Promise<Calendar | undefined> =>
  getCalendarFor(new Date(), calendarRepository)
