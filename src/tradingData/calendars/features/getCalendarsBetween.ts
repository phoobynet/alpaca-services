import { Calendar, CalendarRepository, RawCalendar } from '../types'
import { getTradingData } from '../../http'
import { cleanCalendar } from '../helpers'
import { formatISODate } from '../../../common'

export const getCalendarsBetween = (
  start: Date,
  end: Date,
  calendarRepository?: CalendarRepository,
): Promise<Calendar[]> => {
  if (calendarRepository) {
    return calendarRepository.findBetween(start, end)
  }
  return getTradingData<RawCalendar[]>('/calendar', {
    start: formatISODate(start),
    end: formatISODate(end),
  }).then((rawCalendars) => rawCalendars.map(cleanCalendar) as Calendar[])
}
