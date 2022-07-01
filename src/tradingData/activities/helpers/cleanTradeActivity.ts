import { TradeActivity, ActivityType, RawTradeActivity } from '../types'

export const cleanTradeActivity = (
  rawActivity: RawTradeActivity,
): TradeActivity => {
  return {
    activity_type: rawActivity.activity_type as ActivityType,
    cum_qty: Number(rawActivity.cum_qty),
    id: rawActivity.id,
    leaves_qty: Number(rawActivity.leaves_qty),
    price: Number(rawActivity.price),
    qty: Number(rawActivity.qty),
    side: rawActivity.side,
    symbol: rawActivity.symbol,
    transaction_time: new Date(rawActivity.transaction_time),
    order_id: rawActivity.order_id,
    type: rawActivity.type,
  }
}
