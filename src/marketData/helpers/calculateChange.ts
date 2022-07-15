/**
 * Calculates the difference between two values, providing the actual change, percentage changes, absolute change and sign.
 * @group Market Data
 * @category Helpers
 * @param originalValue
 * @param newValue
 * @example
 * ```ts
 * const change = calculateChange(100, 70)
 * console.log(change)
 * ```
 *
 * ```json
 * {
 *   "change": -30,
 *   "absoluteChange": 30,
 *   "percentChange": -0.3,
 *   "sign": "-1"
 * }
 * ```
 */
export const calculateChange = (
  originalValue: number,
  newValue: number,
): {
  change: number
  absoluteChange: number
  sign: 1 | -1
  changePercent: number
} => {
  const change = newValue - originalValue
  return {
    change,
    absoluteChange: Math.abs(change),
    sign: change >= 0 ? 1 : -1,
    changePercent: change / originalValue,
  }
}
