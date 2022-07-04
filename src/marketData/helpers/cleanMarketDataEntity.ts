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

  if (!result.S) {
    symbol = cleanSymbol(symbol)
    result.S = symbol
  }

  return result
}
