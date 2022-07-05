import { BarAdjustment } from './BarAdjustment'

/**
 * {@link getMultiBars} args.
 * @group Market Data
 * @category Bar
 */
export type MultiBarsArgs = {
  symbols: string[]
  timeframe: string
  adjustment: BarAdjustment
  start: Date
  end: Date
  // absolute limit per symbol (max: 1_000)
  absoluteLimit: number
}
