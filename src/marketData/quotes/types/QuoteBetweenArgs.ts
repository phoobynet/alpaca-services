/**
 * {@link getQuotesBetween} args
 * @group Market Data
 * @category Quote
 */
export type QuoteBetweenArgs = {
  symbol: string
  start: Date
  end: Date
  absoluteLimit?: number
  exchanges?: string[]
}
