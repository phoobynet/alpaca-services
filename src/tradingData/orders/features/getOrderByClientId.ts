import { Order, RawOrder } from '../types'
import { getTradeData } from '../../http'
import { cleanOrder } from '../helpers'

export const getOrderByClientId = async (
  clientId: string,
): Promise<Order | undefined> => {
  const httpResponse = await getTradeData<RawOrder>(
    '/orders:by_client_order_id',
    {
      client_order_id: clientId,
    },
  )

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
