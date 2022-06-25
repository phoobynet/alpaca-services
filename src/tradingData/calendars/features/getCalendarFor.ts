import { getCalendarsBetween } from './getCalendarsBetween'
import { isDateEqual } from '../../../common'
import { Calendar } from '../types'

export const getCalendarFor = async (
  date: Date,
): Promise<Calendar | undefined> => {
  const calendars = await getCalendarsBetween(date, date)
  return calendars.find((calendar) => isDateEqual(calendar.date, date))
}
