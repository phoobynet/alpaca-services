import { Bar } from '@/marketData/bars/types'
import { cleanBar } from './cleanBar'

/**
 * Cleans multi bars.  See {@link cleanBar} for details.
 * @internal
 * @group Market Data
 * @category Bars
 * @param latestMultiBars
 */
export const cleanLatestMultiBars = (
  latestMultiBars: Record<string, unknown>,
): Record<string, Bar> => {
  const result: Record<string, Bar> = {}
  Object.keys(latestMultiBars).forEach((symbol) => {
    const bar = latestMultiBars[symbol] as Bar

    result[symbol] = cleanBar(bar, symbol)
  })

  return result
}
