import { Calendar } from '../types'
import { getCalendarsBetween } from './getCalendarsBetween'
import { subBusinessDays } from 'date-fns'
import { last } from 'lodash'

export const getPreviousCalendar = async (
  date: Date = new Date(),
): Promise<Calendar> => {
  const start = subBusinessDays(date, 5)
  const end = subBusinessDays(date, 1)

  const previousCalendar = await getCalendarsBetween(start, end).then(last)

  if (!previousCalendar) {
    throw new Error(
      'Expected to find a previous calendar, but nothing was found',
    )
  }

  return previousCalendar
}
