import { getCalendarsBetween } from './getCalendarsBetween'
import { isDateEqual } from '../../../common'
import { Calendar, CalendarRepository } from '../types'

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
