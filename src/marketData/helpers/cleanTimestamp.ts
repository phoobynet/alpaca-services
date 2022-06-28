import { parseISO, isValid } from 'date-fns'
import { MarketDataEntity } from '../types'

export const cleanTimestamp = <T extends MarketDataEntity>(
  marketDataEntity: T,
): T => {
  const t = parseISO(marketDataEntity.t)

  if (!isValid(t)) {
    throw new CleanTimestampError(
      'Invalid .t value cannot be parsed using ISO format',
      marketDataEntity,
    )
  }
  return {
    ...marketDataEntity,
    t: t.toISOString(),
  }
}

export class CleanTimestampError extends Error {
  constructor(message: string, public marketDataEntity?: unknown) {
    super(message)
    this.name = 'CleanTimestampError'
  }
}
