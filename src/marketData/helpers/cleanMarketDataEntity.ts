import { parseISO } from 'date-fns'
import { cleanSymbol } from '../../common'

export const cleanMarketDataEntity = <T extends { t: string; S?: string }>(
  entity: T,
  symbol = '',
): T => {
  const result = {
    ...entity,
  }

  if (!entity.S) {
    if (!symbol) {
      throw new Error(
        'Entity has no .S property.  Please provide a symbol to that it can be populated.',
      )
    }

    symbol = cleanSymbol(symbol)

    if (!symbol) {
      throw new Error('symbol is invalid')
    }

    result.S = symbol
  }

  if ('t' in entity) {
    result.t = parseISO(entity.t).toISOString()
  }

  return result
}
