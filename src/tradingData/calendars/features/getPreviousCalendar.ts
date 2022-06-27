import { Calendar, CalendarRepository } from '../types'
import { getCalendarsBetween } from './getCalendarsBetween'
import { subBusinessDays } from 'date-fns'
import last from 'lodash/last'

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
