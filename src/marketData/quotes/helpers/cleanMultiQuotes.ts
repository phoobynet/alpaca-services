import { Quote } from '../types'

export const cleanMultiQuotes = (
  multiQuotes: Record<string, unknown[]>,
): Record<string, Quote[]> => {
  const cleanedMultiQuotes: Record<string, Quote[]> = {}

  Object.keys(multiQuotes).forEach((symbol) => {
    const symbolQuotes = multiQuotes[symbol] as Quote[]

    cleanedMultiQuotes[symbol] = symbolQuotes.map((bar: Quote) => {
      return {
        ...bar,
        S: symbol,
      }
    })
  })
  return cleanedMultiQuotes
}
