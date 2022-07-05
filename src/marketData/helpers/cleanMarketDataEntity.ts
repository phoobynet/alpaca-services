import { cleanSymbol } from '../../common'
import { cleanTimestamp } from './cleanTimestamp'
import { MarketDataEntity } from '../types'

export const cleanMarketDataEntity = <T extends MarketDataEntity>(
  entity: T,
  symbol = '',
): T => {
  const result = cleanTimestamp({
    ...entity,
  })

  if (!entity.S && !(symbol || '').trim()) {
    throw new Error(
      'Entity does not have an existing .S property and no symbol was supplied',
    )
  }

  result.S = cleanSymbol(entity.S || symbol)

  return result
}
