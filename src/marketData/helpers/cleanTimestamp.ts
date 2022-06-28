import { parseISO } from 'date-fns'
import { MarketDataEntity } from '../types'

export const cleanTimestamp = <T extends MarketDataEntity>(
  marketDataEntity: T,
): T => {
  return {
    ...marketDataEntity,
    t: parseISO(marketDataEntity.t).toISOString(),
  }
}
