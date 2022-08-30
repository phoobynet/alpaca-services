import { Calendar, RawCalendar } from '../types'
import { getTradeData } from '../../http'
import { cleanCalendar } from '../helpers'
import { formatISO } from 'date-fns'
import { options } from '@/options'

/**
 * Gets calendars, if available, for a given date range.
 * @group Trading Data
 * @category Calendars
 * @example
 * ```ts
 * const calendars = await getCalendarsBetween(new Date('2022-07-01'), new Date('2022-07-31'))
 * ```
 * @remarks If an {@link CalendarRepository} is provided, and no {@link Calendar} is found, the function WILL NOT fall back to HTTP.
 * @param {Date} start
 * @param {Date} end
 * @param {boolean} forceHttp - bypass calendarRepository and force HTTP request
 * @returns {Promise<Calendar | undefined>} - when not found, returns undefined indicating the calendar is not available, e.g. 4th July 2022.
 */
export const getCalendarsBetween = async (
  start: Date,
  end: Date,
  forceHttp = false,
): Promise<Calendar[]> => {
  const { calendarRepository } = options.get()

  if (calendarRepository && !forceHttp) {
    return calendarRepository.findBetween(start, end)
  }

  const httpResponse = await getTradeData<RawCalendar[]>('/calendar', {
    start: formatISO(start, { representation: 'date' }),
    end: formatISO(end, { representation: 'date' }),
  })

  if (httpResponse.ok) {
    const rawCalendars = httpResponse.data || []
    return rawCalendars.map((calendar) => cleanCalendar(calendar)) as Calendar[]
  } else {
    throw new Error(httpResponse.message)
  }
}
