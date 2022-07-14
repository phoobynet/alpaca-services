import { getCalendarsBetween } from '@/tradingData'
import { Calendar } from '@/tradingData/calendars/types'
import { isDateEqual } from '@/helpers'
import { options } from '@/options'

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
 * @param {boolean} forceHttp - bypass calendarRepository and force HTTP request
 * @returns {Promise<Calendar | undefined>} - when not found, returns undefined indicating the calendar is not available, e.g. 4th July 2022.
 */
export const getCalendarFor = async (
  date: Date,
  forceHttp = false,
): Promise<Calendar | undefined> => {
  const { calendarRepository } = options.get()

  if (calendarRepository && !forceHttp) {
    return calendarRepository.find(date)
  }

  // when no calendars for a given date are found, the next trading date is returned
  // this is not the desired behavior
  const calendars = await getCalendarsBetween(date, date, forceHttp)
  return calendars.find((calendar) => isDateEqual(calendar.date, date))
}
