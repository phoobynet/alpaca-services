import { Trade } from '../types'
import { cleanTrade } from './cleanTrade'

export const cleanLatestMultiTrades = (
  latestMultiTrades: Record<string, unknown>,
): Record<string, Trade> => {
  const result: Record<string, Trade> = {}
  Object.keys(latestMultiTrades).forEach((symbol) => {
    const trade = latestMultiTrades[symbol] as Trade

    result[symbol] = cleanTrade(trade, symbol)
  })

  return result
}
