import { MarketDataEntity } from '../../types'

/**
 * Represents a crypto or US equity trade.
 * @group Market Data
 * @category Trades
 */
export interface Trade extends MarketDataEntity {
  x: string
  p: number
  s: number
  i: number

  // crypto only
  tks?: string

  // equity only
  c?: string[]

  // equity only
  z?: string
}
