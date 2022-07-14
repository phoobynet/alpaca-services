import { TradeActivity, ActivityType, RawTradeActivity } from '../types'

/**
 * Clean up a raw trade activity, parsing date like fields to Date objects, and numeric like fields to number's.
 * @group Trading Data
 * @category Account Activity
 * @internal
 * @param rawActivity
 * @see https://alpaca.markets/docs/api-references/trading-api/account-activities/#tradeactivity-entity
 */
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
