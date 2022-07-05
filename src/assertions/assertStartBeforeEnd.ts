import { assertDate } from './assertDate'
import { isAfter } from 'date-fns'

export const assertStartBeforeEnd = (start: Date, end: Date): void => {
  assertDate(start)
  assertDate(end)

  if (isAfter(start, end)) {
    throw new Error('Start date must be before end date')
  }
}
