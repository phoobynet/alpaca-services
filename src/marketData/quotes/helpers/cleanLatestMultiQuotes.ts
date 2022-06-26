import { Quote } from '../types'
import { cleanQuote } from './cleanQuote'

export const cleanLatestMultiQuotes = (
  latestMultiQuotes: Record<string, unknown>,
): Record<string, Quote> => {
  const result: Record<string, Quote> = {}
  Object.keys(latestMultiQuotes).forEach((symbol) => {
    const quote = latestMultiQuotes[symbol] as Quote

    result[symbol] = cleanQuote(quote, symbol)
  })

  return result
}
