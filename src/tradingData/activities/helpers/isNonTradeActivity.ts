import { RawNonTradeActivity, RawTradeActivity } from '../types'

/**
 * @group Trading Data
 * @category Account Activity
 * @internal
 * @param activity
 */
export const isNonTradeActivity = (
  activity: RawNonTradeActivity | RawTradeActivity,
): boolean => 'per_share_amount' in activity
