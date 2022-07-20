import { Position, RawPosition } from '@/tradingData/positions/types'
import { getTradeData } from '@/tradingData/http'
import { cleanPosition } from '@/tradingData/positions/helpers'

/**
 * @group Trading Data
 * @category Positions
 */
export const getOpenPositions = async (): Promise<Position[]> => {
  const httpResponse = await getTradeData<RawPosition[]>('/positions')

  if (httpResponse.ok) {
    return httpResponse.data?.map((position) => cleanPosition(position)) || []
  } else {
    throw new Error(httpResponse.message)
  }
}
