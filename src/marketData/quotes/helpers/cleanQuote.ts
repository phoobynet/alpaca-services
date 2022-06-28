import { Quote, RawQuote } from '../types'
import { cleanMarketDataEntity } from '../../helpers'

export const cleanQuote = (quote: RawQuote | Quote, symbol?: string): Quote => {
  if ('quote' in quote) {
    return cleanQuote({
      ...(quote as RawQuote).quote,
      S: quote.symbol,
    } as Quote)
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
