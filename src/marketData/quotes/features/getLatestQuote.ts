import { Quote, RawQuote } from '@/marketData/quotes/types'
import { cleanQuote } from '@/marketData/quotes/helpers'
import { cleanSymbol, getSource, isCryptoSource } from '@/marketData/helpers'

/**
 * @group Market Data
 * @category Quotes
 * @param {string} symbol
 */
export const getLatestQuote = async (symbol: string): Promise<Quote> => {
  symbol = cleanSymbol(symbol)
  const source = await getSource(symbol)

  const queryParams: Record<string, string> = {}

  if (isCryptoSource(source)) {
    const url = '/latest/quotes'
    queryParams.symbols = symbol
    return source
      .get<{ quotes: Record<string, RawQuote> }>(url, queryParams)
      .then((data) => cleanQuote(data.quotes[symbol], symbol))
  } else {
    const url = `${symbol}/quotes/latest`
    return source
      .get<RawQuote>(url, {})
      .then((rawQuote) => cleanQuote(rawQuote, symbol))
  }
}
