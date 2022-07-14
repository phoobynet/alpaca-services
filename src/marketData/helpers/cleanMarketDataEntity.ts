import { cleanTimestamp } from '@/marketData/helpers'
import { MarketDataEntity } from '@/marketData/types'

/**
 * @group Market Data
 * @category Helpers
 * @param entity
 * @param symbol
 */
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

  result.S = entity.S || symbol

  return result
}
