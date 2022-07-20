import { TradeEventType, TradeUpdate } from '@/tradingData/streaming/types'
import { cleanOrder } from '@/tradingData'
import { isValid, parseISO } from 'date-fns'
import { RawTradeUpdate } from '@/tradingData/streaming/types/RawTrade'

/**
 * @internal
 * @group Trading Data
 * @category Streaming
 * @param tradeUpdate
 */
export const cleanTradeUpdate = (tradeUpdate: RawTradeUpdate): TradeUpdate => {
  const { event, execution_id, order, position_qty, price, qty, timestamp } =
    tradeUpdate

  const t = parseISO(timestamp)

  if (!isValid(t)) {
    throw new Error('Invalid timestamp')
  }

  return {
    event: event as TradeEventType,
    execution_id,
    order: cleanOrder(order),
    position_qty: Number(position_qty),
    price: Number(price),
    qty: Number(qty),
    timestamp: parseISO(timestamp).toISOString(),
  }
}
