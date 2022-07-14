import { MarketDataEntity } from '@/marketData/types'

/**
 * @group Market Data
 * @category Bars
 */
export interface Bar extends MarketDataEntity {
  /** Open */
  o: number
  /** High */
  h: number
  /** Low */
  l: number
  /** Close */
  c: number
  /** Volume */
  v: number
  /** Exchange - crypto only */
  x?: string
  /** Number of trades */
  n?: number
  /** VWAP - stocks only */
  vw?: number
}
