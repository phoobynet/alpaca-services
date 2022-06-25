import { MarketDataEntity } from '../../types'

/**
 * See https://alpaca.markets/docs/api-references/market-data-api/stock-pricing-data/historical/#quote
 */
export interface Quote extends MarketDataEntity {
  // stock only
  ax?: string

  ap: number
  as: number

  // stock only
  bx?: string

  bp: number
  bs: number

  // stock only
  c?: string[]

  // crypto only
  x?: string

  // stock only
  z?: string
}
