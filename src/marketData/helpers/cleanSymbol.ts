export const cleanSymbol = (symbol: string): string => {
  symbol = (symbol ?? '').trim().toUpperCase()

  if (!symbol.length) {
    throw new Error('Failed to clean symbol - there was nothing to clean')
  }

  return symbol
}
