/**
 * {@link getTradesBetween} args
 * @group Market Data
 * @category Trades
 */
export type TradeBetweenArgs = {
  symbol: string
  start: Date
  end: Date
  absoluteLimit?: number
  exchanges?: string[]
}
