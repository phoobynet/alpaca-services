import { isDate, isEqual, startOfDay } from 'date-fns'

/**
 * @group Helpers
 * @internal
 * @param d1
 * @param d2
 */
export const isDateEqual = (d1: Date, d2: Date): boolean => {
  if (isDate(d1) && isDate(d2)) {
    return isEqual(startOfDay(d1), startOfDay(d2))
  }

  throw new Error('Expected both arguments to be dates')
}
