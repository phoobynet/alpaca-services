import { Order } from '@/tradingData/orders/types'
import { TradeEventType } from '@/tradingData/streaming/types'

/**
 * @group Trading Data
 * @category Streaming
 */
export interface TradeUpdate {
  event: TradeEventType
  execution_id: string
  order: Order
  position_qty: number
  price: number
  qty: number
  timestamp: string
}
