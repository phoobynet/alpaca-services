import { addBusinessDays } from 'date-fns'
import { getCalendarsBetween } from './getCalendarsBetween'
import { Calendar } from '../types'
import { first } from 'lodash'

export const getNextCalendar = async (
  date: Date = new Date(),
): Promise<Calendar> => {
  const nextCalendar = await getCalendarsBetween(
    addBusinessDays(date, 1),
    addBusinessDays(date, 5),
  ).then(first)

  if (!nextCalendar) {
    throw new Error('Expected to find a next calendar, but nothing was found')
  }

  return nextCalendar
}
