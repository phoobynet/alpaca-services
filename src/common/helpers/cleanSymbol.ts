/**
 *
 * @group Common
 * @category Helpers
 * @param {string} symbol
 * @throws {CleanSymbolError} - thrown when the symbol is not a valid symbol
 * @example
 * ```ts
 * const symbol = '   aapl  '
 *
 * const cleanedSymbol = cleanSymbol(symbol)
 *
 * expect(cleanedSymbol).toBe('AAPL')
 * ```
 */
export const cleanSymbol = (symbol: string): string => {
  // runtime type check
  // noinspection SuspiciousTypeOfGuard
  if (typeof symbol !== 'string') {
    throw new CleanSymbolError('symbol arg must be a string', symbol)
  }

  symbol = (symbol || '').trim().toUpperCase()

  if (!symbol) {
    throw new CleanSymbolError('symbol arg must be a non-empty string', symbol)
  }

  return symbol
}

/**
 * @group Common
 * @category Helpers
 */
export class CleanSymbolError extends Error {
  constructor(message: string, public symbol: unknown) {
    super(message)
    this.name = 'CleanSymbolError'
  }
}
