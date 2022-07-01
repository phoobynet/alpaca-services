import { RawNonTradeActivity, RawTradeActivity } from '../types'

export const isNonTradeActivity = (
  activity: RawNonTradeActivity | RawTradeActivity,
): boolean => 'per_share_amount' in activity
