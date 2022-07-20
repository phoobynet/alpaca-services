import { RawNonTradeActivity, RawTradeActivity } from '../types'

/**
 * @internal
 * @group Trading Data
 * @category Account Activity
 * @param activity
 */
export const isNonTradeActivity = (
  activity: RawNonTradeActivity | RawTradeActivity,
): boolean => 'per_share_amount' in activity
