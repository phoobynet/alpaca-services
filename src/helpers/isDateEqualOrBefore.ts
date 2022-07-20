import { isBefore, isDate, isEqual, startOfDay } from 'date-fns'

/**
 * If d1 is before or equal to d2, return true.
 * @internal
 * @group Helpers
 * @category Date
 * @param d1
 * @param d2
 * @param {'date' | 'datetime'} level - ignore time part if 'date'.
 */
export const isDateBeforeOrEqualTo = (
  d1: Date,
  d2: Date,
  level: 'date' | 'datetime',
) => {
  if (!isDate(d1) || !isDate(d2)) {
    throw new Error('Expected dates got something else')
  }

  if (level !== 'date' && level !== 'datetime') {
    throw new Error('Expected level to be either "date" or "datetime"')
  }

  if (level === 'date') {
    const d1Date = startOfDay(d1)
    const d2Date = startOfDay(d2)
    return isBefore(d1Date, d1Date) || isEqual(d1Date, d2Date)
  } else if (level === 'datetime') {
    return isBefore(d1, d2) || isEqual(d1, d2)
  }
}
