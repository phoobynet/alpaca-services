import { Order, RawOrder } from '../types'
import qs from 'qs'
import { getTradeData } from '../../http'
import { cleanOrder } from '../helpers'

export type OrdersArgs = {
  status?: 'open' | 'closed' | 'all'
  limit?: number
  after?: string
  until?: Date
  direction?: 'asc' | 'desc'
  nested?: boolean
  side?: 'buy' | 'sell'
  symbols?: string[]
}

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
