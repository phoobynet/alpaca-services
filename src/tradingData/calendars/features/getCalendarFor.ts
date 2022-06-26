import { getCalendarsBetween } from './getCalendarsBetween'
import { isDateEqual } from '../../../common'
import { Calendar, CalendarRepository } from '../types'

export const getCalendarFor = async (
  date: Date,
  calendarRepository?: CalendarRepository,
): Promise<Calendar | undefined> => {
  const calendars = await getCalendarsBetween(date, date, calendarRepository)
  return calendars.find((calendar) => isDateEqual(calendar.date, date))
}
