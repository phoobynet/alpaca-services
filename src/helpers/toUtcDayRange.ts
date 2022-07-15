import { format } from 'date-fns-tz'
import { parseISO } from 'date-fns'

// HACK: This is a hack to get the date to be in the correct timezone.
export const toUtcDayRange = (date: Date): [Date, Date] => {
  const start =
    format(date, 'yyyy-MM-dd', { timeZone: 'ETC/Utc' }) + 'T00:00:00.000Z'
  const end =
    format(date, 'yyyy-MM-dd', { timeZone: 'ETC/Utc' }) + 'T23:59:59.999Z'

  return [parseISO(start), parseISO(end)]
}
