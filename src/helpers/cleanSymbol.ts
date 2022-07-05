import { cleanString } from './cleanString'

/**
 *
 * @group Common
 * @category Helpers
 * @param {string} symbol
 * @throws {Error} - thrown when the symbol is not a valid parseable symbol
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
  symbol = cleanString(symbol).toUpperCase()

  if (!symbol) {
    throw new Error('symbol arg must be a non-empty string')
  }

  return symbol
}
