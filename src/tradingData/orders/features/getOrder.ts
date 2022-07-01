import { Order, RawOrder } from '../types'
import { getTradeData } from '../../http'
import { cleanOrder } from '../helpers'
import { HttpClientError } from '../../../common'

export const getOrder = (orderId: string): Promise<Order | undefined> => {
  try {
    return getTradeData<RawOrder>(`/orders/${orderId}`).then((rawOrder) =>
      cleanOrder(rawOrder),
    )
  } catch (error) {
    if (error instanceof HttpClientError) {
      if (error.statusCode === 404) {
        throw new Error('The requested order was not found')
      }
    }

    throw error
  }
}
