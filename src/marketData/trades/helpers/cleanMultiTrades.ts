import { Trade } from '../types'

export const cleanMultiTrades = (
  multiTrades: Record<string, unknown[]>,
): Record<string, Trade[]> => {
  const cleanedMultiTrades: Record<string, Trade[]> = {}

  Object.keys(multiTrades).forEach((symbol) => {
    const symbolTrades = multiTrades[symbol] as Trade[]

    cleanedMultiTrades[symbol] = symbolTrades.map((bar: Trade) => {
      return {
        ...bar,
        S: symbol,
      }
    })
  })
  return cleanedMultiTrades
}
