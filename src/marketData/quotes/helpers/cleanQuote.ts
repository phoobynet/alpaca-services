import { Quote, RawQuote } from '../types'
import { cleanMarketDataEntity, cleanTimestamp } from '../../helpers'

export const cleanQuote = (
  quote: RawQuote | Quote | undefined,
  symbol?: string,
): Quote => {
  if (quote === undefined) {
    throw new Error('Quote is undefined')
  }
  if ('quote' in quote) {
    const rawQuote = quote as RawQuote
    return cleanQuote(cleanTimestamp(rawQuote.quote), rawQuote.symbol)
  }

  if (!quote.S && !symbol) {
    throw new Error('Symbol is required to clean a Quote')
  }

  const isCryptoQuote = 'x' in quote

  if (isCryptoQuote) {
    const tempQ = {
      ...quote,
      ax: quote.x,
      bx: quote.x,
    }
    delete tempQ.x
    return cleanMarketDataEntity(tempQ, symbol)
  }

  return cleanMarketDataEntity(quote, symbol)
}
