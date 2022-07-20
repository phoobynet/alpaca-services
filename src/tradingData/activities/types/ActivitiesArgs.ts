import { ActivityType } from '@/tradingData/activities/types/ActivityType'

/**
 * Args for {@link getActivities}.
 * @group Trading Data
 * @category Account Activity
 * @see [Account Activities](https://alpaca.markets/docs/api-references/trading-api/account-activities/#activity-types)
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
