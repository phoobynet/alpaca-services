import { Calendar, CalendarRepository } from '../types'
import { getCalendarFor } from './getCalendarFor'

export const getCalendarForToday = async (
  calendarRepository?: CalendarRepository,
): Promise<Calendar | undefined> =>
  getCalendarFor(new Date(), calendarRepository)
