export interface Bar {
  S: string

  t: string

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
