import { Calendar } from '@/tradingData'

/**
 * Extracts date from value.
 * @group Helpers
 * @category Date
 * @param value
 */
export const getDateFrom = (value: Date | string | Calendar): Date => {
  if (value instanceof Date) {
    return value
  }

  if (typeof value === 'string') {
    return new Date(value)
  }

  if ('date' in value) {
    return value.date
  }

  throw new Error('Invalid value')
}
