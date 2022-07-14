export interface RawQuote {
  symbol: string
  quote: {
    t: string
    ap: number
    as: number
    bp: number
    bs: number

    // crypto only
    x?: string

    // stock only
    c?: string[]
    z?: string
    bx?: string
    ax?: string
  }
}
