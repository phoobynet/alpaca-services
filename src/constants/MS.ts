/**
 * Represents the milliseconds in a second for various time periods.
 * @group Constants
 * @example
 * ```ts
 * const now = new Date()
 *
 * // the datetime 4 weeks ago
 * const then = new Date(now.getTime() - 4 * MS.WEEK)
 * ```
 */
export const MS = {
  second: 1_000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
  week: 604_800_000,
}
