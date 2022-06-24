import { parseISO } from 'date-fns'

export const cleanTimestamp = <T extends { t: string }>(
  marketDataEntity: T,
): T => {
  return {
    ...marketDataEntity,
    t: parseISO(marketDataEntity.t),
  }
}
