import { isValid, parseISO } from 'date-fns'
import { MarketDataEntity } from '../types'

export const cleanTimestamp = <T extends MarketDataEntity>(
  marketDataEntity: T,
): T => {
  let t: Date

  if (typeof marketDataEntity.t === 'string') {
    t = parseISO(marketDataEntity.t)
  } else {
    t = marketDataEntity.t
  }

  if (!isValid(t)) {
    throw new CleanTimestampError(
      'Invalid .t value cannot be parsed using ISO format',
      marketDataEntity,
    )
  }
  return {
    ...marketDataEntity,
    t,
  }
}

export class CleanTimestampError extends Error {
  constructor(message: string, public marketDataEntity?: unknown) {
    super(message)
    this.name = 'CleanTimestampError'
  }
}
