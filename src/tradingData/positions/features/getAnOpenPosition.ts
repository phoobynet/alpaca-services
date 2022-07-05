import { Position, RawPosition } from '../types'
import { getTradeData } from '../../http'
import { cleanSymbol } from '../../../helpers'
import { cleanPosition } from '../helpers'

export const getAnOpenPosition = async (
  symbol: string,
): Promise<Position | undefined> => {
  const httpResponse = await getTradeData<RawPosition>(
    `/positions/${cleanSymbol(symbol)}`,
  )

  if (httpResponse.ok) {
    const rawPosition = httpResponse.data

    if (rawPosition) {
      return cleanPosition(rawPosition)
    }

    return undefined
  } else {
    throw new Error(httpResponse.message)
  }
}
