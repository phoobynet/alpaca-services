import { RawOrder } from '@/tradingData/orders/types'

/**
 * @internal
 */
export interface RawTradeUpdate {
  event: string
  execution_id: string
  order: RawOrder
  position_qty: string
  price: string
  qty: string
  timestamp: string
}
