import { MarketDataEntity } from '../../types'

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
