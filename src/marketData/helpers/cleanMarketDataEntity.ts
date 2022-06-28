import { cleanSymbol } from '../../common'
import { MarketDataEntity } from '../types'
import { cleanTimestamp } from './cleanTimestamp'

export const cleanMarketDataEntity = <T extends MarketDataEntity>(
  entity: T,
  symbol = '',
): T => {
  const result = cleanTimestamp({
    ...entity,
  })

  if (!entity.S) {
    symbol = cleanSymbol(symbol)

    if (!symbol) {
      throw new Error(
        'Entity has no .S property.  Please provide a symbol to that it can be populated.',
      )
    }

    result.S = symbol
  }

  return result
}
