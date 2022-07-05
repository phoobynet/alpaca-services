import { cleanSymbol } from './cleanSymbol'

export const cleanSymbols = (symbols: string[]): string[] =>
  symbols.map((symbol) => cleanSymbol(symbol))
