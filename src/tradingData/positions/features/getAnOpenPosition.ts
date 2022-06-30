import { Position, RawPosition } from '../types'
import { getTradeData } from '../../http'
import { cleanSymbol } from '../../../common'
import { cleanPosition } from '../helpers'

export const getAnOpenPosition = (
  symbol: string,
): Promise<Position | undefined> =>
  getTradeData<RawPosition>(`/positions/${cleanSymbol(symbol)}`).then(
    (rawPosition) => {
      if (rawPosition) {
        cleanPosition(rawPosition)
      }
      return undefined
    },
  )
