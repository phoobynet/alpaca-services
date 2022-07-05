import { cleanSymbol } from './cleanSymbol'

const { cleanSymbols } = jest.requireActual('./cleanSymbols')

describe('cleanSymbols', () => {
  ;(cleanSymbol as jest.Mock).mockImplementation((symbol: string) => symbol)
  test('should call clean symbol for each symbol', () => {
    const symbols = ['AAPL', 'AMZN']

    cleanSymbols(symbols)

    expect(cleanSymbol).toHaveBeenNthCalledWith(1, 'AAPL')
    expect(cleanSymbol).toHaveBeenNthCalledWith(2, 'AMZN')
  })

  test('should return cleaned symbols', () => {
    const symbols = ['AAPL', 'AMZN']

    const actual = cleanSymbols(symbols)
    expect(actual).toEqual(['AAPL', 'AMZN'])
  })
})
