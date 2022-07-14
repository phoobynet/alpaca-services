/**
 * Raw result from Alpaca
 * @internal
 * @group Market Data
 * @category Bars
 */
export interface RawBar {
  symbol: string
  bar: {
    o: number
    h: number
    l: number
    c: number
    v: number
    t: string
    vw?: number
    n?: number
    x?: string
  }
}
