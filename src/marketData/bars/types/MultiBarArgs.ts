import { BarAdjustment } from '@/marketData/bars/types'

/**
 * {@link getMultiBars} args.
 * @group Market Data
 * @category Bars
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
