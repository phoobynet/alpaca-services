import { Position, RawPosition } from '../types'
import { getTradeData } from '../../http'
import { cleanPosition } from '../helpers'

export const getOpenPositions = async (): Promise<Position[]> => {
  const httpResponse = await getTradeData<RawPosition[]>('/positions')

  if (httpResponse.ok) {
    return httpResponse.data?.map((position) => cleanPosition(position)) || []
  } else {
    throw new Error(httpResponse.message)
  }
}
