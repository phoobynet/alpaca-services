import { cleanTimestamp } from '@/marketData/helpers'
import { MarketDataEntity } from '@/marketData/types'

/**
 * Cleans any {@link MarketDataEntity}.
 * @group Market Data
 * @category Helpers
 * @param {MarketDataEntity} entity - any suitable {@link MarketDataEntity}
 * @param {string} symbol - if no symbol is provided, the entity's .S property will be used if present; otherwise throws an error.
 * @returns {MarketDataEntity} - with .S and .t properties correctly formatted.
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
