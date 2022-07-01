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

type Activity = NonTradeActivity | TradeActivity
type Activities = Activity[]

type RawActivity = RawNonTradeActivity | RawTradeActivity
type RawActivities = RawActivity[]

export type ActivitiesArgs = {
  activityType?: ActivityType
  date?: Date
  until?: Date
  after?: Date
  direction?: 'asc' | 'desc'
  pageLimit?: number
}

// TODO: build get activities query
export const getActivities = (args: ActivitiesArgs): Promise<Activities> => {
  const { activityType } = args

  const url = `/account/activities/${activityType}`

  return getTradeData<RawActivities>(url).then((rawActivities) => {
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
