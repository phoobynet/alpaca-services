/**
 * {@link getMultiTrades} args
 * @group Market Data
 * @category Trades
 */
export type MultiTradesArgs = {
  symbols: string[]
  start: Date
  end: Date
  // absolute limit per symbol (max: 1_000)
  absoluteLimit: number
}
