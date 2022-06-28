import { cleanSymbol, CleanSymbolError } from '../../common'
import { MarketDataEntity } from '../types'
import { cleanTimestamp, CleanTimestampError } from './cleanTimestamp'

export const cleanMarketDataEntity = <T extends MarketDataEntity>(
  entity: T,
  symbol = '',
): T => {
  try {
    const result = cleanTimestamp({
      ...entity,
    })

    if (!result.S) {
      symbol = cleanSymbol(symbol)
      result.S = symbol
    }

    return result
  } catch (e) {
    if (e instanceof CleanSymbolError) {
      throw new CleanMarketDataEntityError(
        'Entity has no .S property.  Please provide a valid symbol so that it can be populated.',
        entity,
        symbol,
      )
    }

    if (e instanceof CleanTimestampError) {
      throw new CleanMarketDataEntityError(
        'entity.t value is not a valid ISO formatted date string',
        entity,
        symbol,
      )
    }
    throw e
  }
}

export class CleanMarketDataEntityError extends Error {
  constructor(
    message: string,
    public entity?: unknown,
    public symbol?: unknown,
  ) {
    super(message)
  }
}
