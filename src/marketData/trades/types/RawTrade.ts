export interface RawTrade {
  trade: {
    t: string
    x: string
    p: number
    s: number
    i: number

    // stock only
    c?: string[]
    z?: string

    // crypto only
    tks?: string
  }
  symbol: string
}
