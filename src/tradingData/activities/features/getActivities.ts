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
import { trimEnd } from 'lodash'
import { isAfter } from 'date-fns'

export type Activity = NonTradeActivity | TradeActivity
export type Activities = Activity[]

type RawActivity = RawNonTradeActivity | RawTradeActivity
type RawActivities = RawActivity[]

/**
 * See https://alpaca.markets/docs/api-references/trading-api/account-activities/#activity-types
 * for a list of activity types and the rules for making requests.
 */
export type ActivitiesArgs = {
  activity_type?: ActivityType
  date?: Date
  until?: Date
  after?: Date
  direction?: 'asc' | 'desc'
  page_size?: number
  // page_token represents the ID of the end of your current page of results
  page_token?: string
}

/**
 * https://alpaca.markets/docs/api-references/trading-api/account-activities/
 *
 * @example
 * ```ts
 * const activities = await getActivities({
 *   activity_type: ActivityType.FILL,
 *   date: new Date('2022-07-01'),
 * })
 * ```
 * @param {ActivitiesArgs} args
 */
export const getActivities = (args: ActivitiesArgs): Promise<Activities> => {
  const {
    activity_type,
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

  const url = trimEnd(`/account/activities/${activity_type}`, '/')

  return getTradeData<RawActivities>(url, queryParams).then((rawActivities) => {
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
  })
}
