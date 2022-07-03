import { formatISO } from 'date-fns'

/**
 * @group Common
 * @category Helpers
 * @internal
 * Formats a date in ISO format.
 * @example
 * ```ts
 * const date = new Date('2020-01-01 12:00:00')
 *
 * const formattedDate = formatISODate(date)
 *
 * expect(formattedDate).toBe('2020-01-01')
 * ```
 * @param date
 */
export const formatISODate = (date: Date): string =>
  formatISO(date, { representation: 'date' })
