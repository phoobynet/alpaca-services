export interface NumberDiffResult {
  change: number
  absoluteChange: number
  sign: 1 | -1
  changePercent: number
}

/**
 * Calculates the change between two numbers.
 * @group Helpers
 * @param originalValue
 * @param newValue
 */
export const numberDiff = (
  originalValue: number,
  newValue: number,
): NumberDiffResult => {
  const change = newValue - originalValue
  return {
    change,
    absoluteChange: Math.abs(change),
    sign: change >= 0 ? 1 : -1,
    changePercent: change / originalValue,
  }
}
