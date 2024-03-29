import { Bar } from '@/marketData/bars/types'

/**
 * Cleans multi bars.  See {@link cleanBar} for details.
 * @internal
 * @group Market Data
 * @category Bars
 * @param multiBars
 */
export const cleanMultiBars = (
  multiBars: Record<string, unknown[]>,
): Record<string, Bar[]> => {
  const cleanedMultiBars: Record<string, Bar[]> = {}

  Object.keys(multiBars).forEach((symbol) => {
    const symbolBars = multiBars[symbol] as Bar[]

    cleanedMultiBars[symbol] = symbolBars.map((bar: Bar) => {
      return {
        ...bar,
        S: symbol,
      }
    })
  })
  return cleanedMultiBars
}
