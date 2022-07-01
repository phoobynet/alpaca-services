import { ActivityType, NonTradeActivity, RawNonTradeActivity } from '../types'

export const cleanNonTradeActivity = (
  rawNonTradeActivity: RawNonTradeActivity,
): NonTradeActivity => {
  return {
    activity_type: rawNonTradeActivity.activity_type as ActivityType,
    id: rawNonTradeActivity.id,
    date: new Date(rawNonTradeActivity.date),
    net_amount: Number(rawNonTradeActivity.net_amount),
    symbol: rawNonTradeActivity.symbol,
    qty: Number(rawNonTradeActivity.qty),
    per_share_amount: Number(rawNonTradeActivity.per_share_amount),
  }
}
