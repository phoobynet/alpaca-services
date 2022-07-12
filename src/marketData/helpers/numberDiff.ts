export interface NumberDiff {
  change: number
  absoluteChange: number
  sign: 1 | -1
  changePercent: number
}

export const numberDiff = (
  originalValue: number,
  newValue: number,
): NumberDiff => {
  const change = newValue - originalValue
  return {
    change,
    absoluteChange: Math.abs(change),
    sign: change >= 0 ? 1 : -1,
    changePercent: change / originalValue,
  }
}
