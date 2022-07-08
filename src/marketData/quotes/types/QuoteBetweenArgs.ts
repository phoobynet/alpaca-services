/**
 * {@link getQuotesBetween} args
 * @group Market Data
 * @category Quotes
 */
export type QuoteBetweenArgs = {
  symbol: string
  start: Date
  end: Date
  absoluteLimit?: number
  exchanges?: string[]
}
