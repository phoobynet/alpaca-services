import { Order, RawOrder } from '@/tradingData/orders/types'
import { getTradeData } from '@/tradingData/http'
import { cleanOrder } from '@/tradingData/orders/helpers'

/**
 * @group Trading Data
 * @category Orders
 * @param orderId
 */
export const getOrder = async (orderId: string): Promise<Order | undefined> => {
  const httpResponse = await getTradeData<RawOrder>(`/orders/${orderId}`)

  if (httpResponse.ok) {
    const rawOrder = httpResponse.data

    if (rawOrder) {
      return cleanOrder(rawOrder)
    }

    return undefined
  } else {
    throw new Error(httpResponse.message)
  }
}
