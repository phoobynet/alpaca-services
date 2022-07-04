import { Quote, RawQuote } from '../types'
import { cleanMarketDataEntity, cleanTimestamp } from '../../helpers'
import { ArgumentValidationError } from '../../../common'

export const cleanQuote = (quote: RawQuote | Quote, symbol?: string): Quote => {
  if ('quote' in quote) {
    const rawQuote = quote as RawQuote
    return cleanQuote(cleanTimestamp(rawQuote.quote), rawQuote.symbol)
  }

  if (!quote.S && !symbol) {
    throw new ArgumentValidationError('Symbol is required to clean a Quote')
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
