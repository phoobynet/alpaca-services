import { cleanSymbol } from './cleanSymbol'

describe('cleanSymbol throws error when symbol is', () => {
  // description, symbol, expectedError
  const testCases: Array<[string, unknown, string]> = [
    ['empty string', '', 'symbol arg must be a non-empty string'],
    ['whitespace', '    ', 'symbol arg must be a non-empty string'],
    ['undefined', undefined, 'symbol arg must be a string'],
    ['null', null, 'symbol arg must be a string'],
    ['not a string', 0, 'symbol arg must be a string'],
  ]

  test.each(testCases)('%s', (_, symbol, expectedError) => {
    expect(() => cleanSymbol(symbol as string)).toThrow(expectedError)
  })
})

describe('cleanSymbol symbol arg is valid', () => {
  // description, symbol, expectedSymbol
  const testCases: Array<[string, string, string]> = [
    ['non-empty string in the correct format', 'AAPL', 'AAPL'],
    ['with some leading and trailing spaces', ' AAPL ', 'AAPL'],
    ['lowercase', 'aapl', 'AAPL'],
  ]

  test.each(testCases)('%s', (_, symbol, expectedSymbol) => {
    expect(cleanSymbol(symbol)).toBe(expectedSymbol)
  })
})
