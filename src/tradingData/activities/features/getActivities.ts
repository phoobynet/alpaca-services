import {
  ActivityType,
  NonTradeActivity,
  RawNonTradeActivity,
  RawTradeActivity,
  TradeActivity,
} from '../types'
import { getTradeData } from '../../http'
import { isNonTradeActivity } from '../helpers/isNonTradeActivity'
import { cleanNonTradeActivity, cleanTradeActivity } from '../helpers'
import { isAfter } from 'date-fns'

export type Activity = NonTradeActivity | TradeActivity
export type Activities = Activity[]

type RawActivity = RawNonTradeActivity | RawTradeActivity
type RawActivities = RawActivity[]

/**
 * Activity query arguments.
 * @group Trading Data
 * @category Account Activity
 * @see https://alpaca.markets/docs/api-references/trading-api/account-activities/#activity-types
 */
export type ActivitiesArgs = {
  activity_types?: ActivityType[]
  date?: Date
  until?: Date
  after?: Date
  direction?: 'asc' | 'desc'
  page_size?: number
  // page_token represents the ID of the end of your current page of results
  page_token?: string
}

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
