import { isValid } from 'date-fns'

/**
 * @group Common
 * @category Validators
 * @param {Date} date
 * @throws {Error} if date is not valid
 */
export const assertDate = (date: Date): void => {
  if (!isValid(date)) {
    throw new Error('date is not a valid date')
  }
}
