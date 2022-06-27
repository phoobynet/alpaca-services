import z from 'zod'

export const cleanSymbol = (symbol: string): string => {
  symbol = z.string().parse(symbol)
  return symbol?.toUpperCase().trim()
}
