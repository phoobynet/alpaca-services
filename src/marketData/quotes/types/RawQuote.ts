export interface RawQuote {
  symbol: string
  quote: {
    t: string
    ap: number
    as: 1
    bp: 165.5
    bs: 1

    // crypto only
    x?: string

    // stock only
    c?: string[]
    z?: string
    bx?: string
    ax?: string
  }
}
