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

export const getOrders = (args: OrdersArgs): Promise<Order[]> => {
  const queryString = qs.stringify(args, { arrayFormat: 'comma' })

  return getTradeData<RawOrder[]>(`/orders?${queryString}`).then((rawOrders) =>
    rawOrders.map(cleanOrder),
  )
}
