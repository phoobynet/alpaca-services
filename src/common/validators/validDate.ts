import { isValid } from 'date-fns'

/**
 * @group Common
 * @category Validators
 * @param {Date} date
 * @throws {ArgumentValidationError} if date is not valid
 */
export const validDate = (date: Date): void => {
  if (!isValid(date)) {
    throw new Error('date is not a valid date')
  }
}
