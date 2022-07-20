import {
  NonTradeActivity,
  RawNonTradeActivity,
  RawTradeActivity,
  TradeActivity,
  ActivitiesArgs,
} from '@/tradingData/activities/types'
import { getTradeData } from '@/tradingData/http'
import { isNonTradeActivity } from '@/tradingData/activities/helpers/isNonTradeActivity'
import {
  cleanNonTradeActivity,
  cleanTradeActivity,
} from '@/tradingData/activities/helpers'
import { isAfter } from 'date-fns'

/**
 * @group Trading Data
 * @category Account Activity
 */
export type Activity = NonTradeActivity | TradeActivity

/**
 * @group Trading Data
 * @category Account Activity
 */
export type Activities = Activity[]

type RawActivity = RawNonTradeActivity | RawTradeActivity
type RawActivities = RawActivity[]

/**
 * @group Trading Data
 * @category Account Activity
 * @see https://alpaca.markets/docs/api-references/trading-api/account-activities/
 * @example
 * ```ts
 * const activities = await getActivities({
 *   activity_types: [ActivityType.FILL],
 *   date: new Date('2022-07-01'),
 * })
 * ```
 * @param {ActivitiesArgs} args
 */
export const getActivities = async (
  args: ActivitiesArgs,
): Promise<Activities> => {
  const {
    activity_types,
    date,
    until,
    after,
    direction,
    page_token,
    page_size,
  } = args

  const queryParams: Record<string, string> = {}

  if (date) {
    queryParams.date = date.toISOString()
  }

  if (until && date) {
    throw new Error('Cannot specify both date and until')
  } else if (until) {
    queryParams.until = until.toISOString()
  }

  if (after && date) {
    throw new Error('Cannot specify both date and after')
  } else if (after) {
    queryParams.after = after.toISOString()
  }

  if (after && until) {
    if (isAfter(after, until)) {
      throw new Error('until cannot be before after')
    }
  }

  if (direction) {
    queryParams.direction = direction
  }

  if (page_size) {
    queryParams.page_size = page_size.toString()
  }

  if (page_token) {
    queryParams.page_token = page_token
  }

  if (activity_types) {
    queryParams.activity_types = activity_types.join(',')
  }

  const httpResponse = await getTradeData<RawActivities>(
    '/account/activities',
    queryParams,
  )

  if (httpResponse.ok) {
    const rawActivities = httpResponse.data as RawActivities

    const activities: Activities = []

    for (const rawActivity of rawActivities) {
      if (isNonTradeActivity(rawActivity)) {
        activities.push(
          cleanNonTradeActivity(rawActivity as RawNonTradeActivity),
        )
      } else {
        activities.push(cleanTradeActivity(rawActivity as RawTradeActivity))
      }
    }

    return activities
  } else {
    throw new Error(httpResponse.message)
  }
}
