import { Order, RawOrder } from '../types'
import { getTradeData } from '../../http'
import { cleanOrder } from '../helpers'

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
