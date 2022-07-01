import { Order, RawOrder } from '../types'
import { getTradeData } from '../../http'
import { cleanOrder } from '../helpers'
import { HttpClientError } from '../../../common'

export const getOrderByClientId = (
  clientId: string,
): Promise<Order | undefined> => {
  try {
    return getTradeData<RawOrder>('/orders:by_client_order_id', {
      client_order_id: clientId,
    }).then((rawOrder) => cleanOrder(rawOrder))
  } catch (error) {
    if (error instanceof HttpClientError) {
      if (error.statusCode === 404) {
        throw new Error('The requested order was not found')
      }
    }

    throw error
  }
}
