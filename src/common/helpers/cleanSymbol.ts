/**
 *
 * @group Common
 * @category Helpers
 * @param {string} symbol
 * @throws {ArgumentValidationError} - thrown when the symbol is not a valid parseable symbol
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
    throw new Error('symbol arg must be a string')
  }

  symbol = (symbol || '').trim().toUpperCase()

  if (!symbol) {
    throw new Error('symbol arg must be a non-empty string')
  }

  return symbol
}
