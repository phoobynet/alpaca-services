import { MarketDataEntity } from '../types'
import { cleanMarketDataEntity } from './cleanMarketDataEntity'

const MARKET_DATA_ENTITY_BASE_NO_SYMBOL: MarketDataEntity = Object.freeze({
  t: '2020-01-01T12:00:00.666666Z',
  s: 1,
  price: 100,
})

const MARKET_DATA_ENTITY_BASE_WITH_SYMBOL: MarketDataEntity = Object.freeze({
  t: '2020-01-01T12:00:00.666666Z',
  s: 1,
  price: 100,
  S: 'AAPL',
})

describe('cleanMarketDataEntity', () => {
  describe('should error when the .S is not present and symbol is', () => {
    const expectedNoSymbolError =
      'Entity has no .S property.  Please provide a valid symbol so that it can be populated.'
    const testCases: Array<
      [string, MarketDataEntity, string | null | undefined, string]
    > = [
      [
        'undefined',
        { ...MARKET_DATA_ENTITY_BASE_NO_SYMBOL },
        undefined,
        expectedNoSymbolError,
      ],
      [
        'an empty string',
        { ...MARKET_DATA_ENTITY_BASE_NO_SYMBOL },
        '',
        expectedNoSymbolError,
      ],
      [
        'whitespace',
        { ...MARKET_DATA_ENTITY_BASE_NO_SYMBOL },
        '   ',
        expectedNoSymbolError,
      ],
    ]

    test.each(testCases)('%s', (_, entity, symbol, error) => {
      expect(() => cleanMarketDataEntity(entity, symbol as string)).toThrow(
        error,
      )
    })
  })

  it('should error when the .t is not a valid ISO formatted date string', () => {
    expect(() => {
      cleanMarketDataEntity({
        ...MARKET_DATA_ENTITY_BASE_WITH_SYMBOL,
        t: 'badZ',
      })
    }).toThrow('entity.t value is not a valid ISO formatted date string')
  })

  it('if a symbol arg is used, but the entity.S property is not empty, the entity.S property wins', () => {
    const entity = { ...MARKET_DATA_ENTITY_BASE_WITH_SYMBOL }

    // the symbol argument is ignored
    const actual = cleanMarketDataEntity(entity, 'AMZN')

    expect(actual).toEqual({
      ...entity,
      t: '2020-01-01T12:00:00.666Z',
    })
  })

  it('if a symbol is used, and the entity.S property is empty, the symbol argument wins', () => {
    const entity = { ...MARKET_DATA_ENTITY_BASE_NO_SYMBOL }

    const actual = cleanMarketDataEntity(entity, 'AMZN')
    expect(actual).toEqual({
      ...entity,
      S: 'AMZN',
      t: '2020-01-01T12:00:00.666Z',
    })
  })
})
