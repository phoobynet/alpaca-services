import { Order, OrdersArgs, RawOrder } from '@/tradingData/orders/types'
import qs from 'qs'
import { getTradeData } from '@/tradingData/http'
import { cleanOrder } from '@/tradingData/orders/helpers'

/**
 * @group Trading Data
 * @category Orders
 */
export const getOrders = async (args: OrdersArgs): Promise<Order[]> => {
  const queryString = qs.stringify(args, { arrayFormat: 'comma' })

  const httpResponse = await getTradeData<RawOrder[]>(`/orders?${queryString}`)

  if (httpResponse.ok) {
    const rawOrders = httpResponse.data

    if (rawOrders) {
      return rawOrders.map(cleanOrder)
    }

    return []
  } else {
    throw new Error(httpResponse.message)
  }
}
