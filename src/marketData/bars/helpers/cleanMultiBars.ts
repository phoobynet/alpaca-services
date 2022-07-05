import { Bar } from '../types'
import { cleanSymbol } from '../../../helpers'

export const cleanMultiBars = (
  multiBars: Record<string, unknown[]>,
): Record<string, Bar[]> => {
  const cleanedMultiBars: Record<string, Bar[]> = {}

  Object.keys(multiBars).forEach((symbol) => {
    const symbolBars = multiBars[symbol] as Bar[]

    cleanedMultiBars[symbol] = symbolBars.map((bar: Bar) => {
      return {
        ...bar,
        S: cleanSymbol(symbol),
      }
    })
  })
  return cleanedMultiBars
}
