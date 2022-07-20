import { Position, RawPosition } from '@/tradingData/positions/types'
import { getTradeData } from '@/tradingData/http'
import { cleanPosition } from '@/tradingData/positions/helpers'

/**
 * @group Trading Data
 * @category Positions
 * @param symbol
 */
export const getAnOpenPosition = async (
  symbol: string,
): Promise<Position | undefined> => {
  const httpResponse = await getTradeData<RawPosition>(`/positions/${symbol}`)

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
