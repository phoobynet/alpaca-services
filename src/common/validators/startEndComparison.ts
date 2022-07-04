import { validDate } from './validDate'
import { isBefore, startOfDay } from 'date-fns'
import { isDateBeforeOrEqualTo } from '../helpers/isDateEqualOrBefore'

export enum StartEndComparisonType {
  // start date and time must be before end date and time
  BeforeDateTime = 'BeforeDateTime',
  // start date must be before end date ignoring time
  BeforeDate = 'BeforeDate',
  // start date and time can be equal to or before end date and time
  DateTimeEquality = 'DateTimeEquality',
  // start date can be equal to or before end date ignoring time
  DateEquality = 'DateEquality',
}

/**
 * @group Common
 * @category Validators
 * @param {Date} start
 * @param {Date} end
 * @param {StartEndComparisonType} comparisonType - if true, start and end can be the same date
 */
export const startEndComparison = (
  start: Date,
  end: Date,
  comparisonType: StartEndComparisonType,
): void => {
  validDate(start)
  validDate(end)

  switch (comparisonType) {
    case StartEndComparisonType.BeforeDateTime:
      if (isBefore(end, start)) {
        throw new Error(
          `${comparisonType}: end datetime cannot be before start datetime`,
        )
      }
      break
    case StartEndComparisonType.BeforeDate:
      if (isBefore(startOfDay(end), startOfDay(start))) {
        throw new Error(
          `${comparisonType}: end date cannot be before start date`,
        )
      }
      break
    case StartEndComparisonType.DateTimeEquality:
      if (!isDateBeforeOrEqualTo(start, end, 'datetime')) {
        throw new Error(
          `${comparisonType}: end date cannot be before start date`,
        )
      }
      break
    case StartEndComparisonType.DateEquality:
      if (!isDateBeforeOrEqualTo(start, end, 'date')) {
        throw new Error(
          `${comparisonType}: end date cannot be before start date`,
        )
      }
      break
  }
}
