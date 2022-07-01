import { isDate } from 'date-fns'

export const isDateEqual = (d1: Date, d2: Date): boolean => {
  if (isDate(d1) && isDate(d2)) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  throw new Error('Expected both arguments to be dates')
}
