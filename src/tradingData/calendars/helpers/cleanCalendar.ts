import { Calendar, RawCalendar } from '../types'
import { toDate } from 'date-fns-tz'
import { AMERICA_NEW_YORK_TZ } from '../../../constants'

/**
 * Converts the raw calendar from Alpaca to something using actual Date instances.
 * @group Trading Data
 * @category Calendars
 * @param {RawCalendar} calendar
 * @return {Calendar | undefined}
 */
export const cleanCalendar = (
  calendar: RawCalendar | undefined,
): Calendar | undefined => {
  if (!calendar) {
    return undefined
  }
  return {
    date: parseDateString(calendar.date),
    open: parseDateString(`${calendar.date} ${calendar.open}`),
    close: parseDateString(`${calendar.date} ${calendar.close}`),
    session_open: parseDateString(
      `${calendar.date} ${fixTime(calendar.session_open)}`,
    ),
    session_close: parseDateString(
      `${calendar.date} ${fixTime(calendar.session_close)}`,
    ),
  }
}

/**
 * Fixes the time string issues where some time strings contain a colon and others do not.
 * @param time
 */
function fixTime(time: string): string {
  if (time.includes(':')) {
    return time
  }
  return `${time.substring(0, 2)}:${time.substring(2)}`
}

/**
 * Parses a date string into the new york time zone.
 * @param date
 */
function parseDateString(date: string): Date {
  return toDate(date, {
    timeZone: AMERICA_NEW_YORK_TZ,
  })
}
