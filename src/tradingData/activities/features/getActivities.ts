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
 * @param {ActivitiesArgs} args
 * @remarks
 * See [Account Activities](https://alpaca.markets/docs/api-references/trading-api/account-activities/) for argument information.
 * <aside>
 * <strong>Note: `for await...of` style pagination is not supported for the endpoint.</strong>
 * </aside>
 * @example
 * ```ts
 * const activities = await getActivities({
 *   activity_types: [ActivityType.FILL, ActivityType.DIV],
 *   after: subYears(new Date(), 1),
 *   direction: 'desc',
 *   page_size: 3,
 * })
 *
 * ```
 * ### Example Response
 * ```json
 * [
 *   {
 *     "activity_type": "FILL",
 *     "cum_qty": 0.0519,
 *     "id": "20220701084100573::7a720705-f55b-4d61-8719-xxxxxxxxx",
 *     "leaves_qty": 0,
 *     "price": 19250,
 *     "qty": 0.0519,
 *     "side": "buy",
 *     "symbol": "BTC/USD",
 *     "transaction_time": "2022-07-01T12:41:00.573Z",
 *     "order_id": "b61904a4-2d8f-4366-b6a6-cbd98f2a3d7d",
 *     "type": "fill"
 *   },
 *   {
 *     "activity_type": "FILL",
 *     "cum_qty": 0.2599,
 *     "id": "20220701084040749::e8b2822a-1775-43a2-835b-xxxxxxxxx",
 *     "leaves_qty": 0,
 *     "price": 19244,
 *     "qty": 0.2599,
 *     "side": "sell",
 *     "symbol": "BTC/USD",
 *     "transaction_time": "2022-07-01T12:40:40.749Z",
 *     "order_id": "f5850582-28f5-488d-8628-9abe23455c89",
 *     "type": "fill"
 *   },
 *   {
 *     "activity_type": "FILL",
 *     "cum_qty": 0.2599,
 *     "id": "20220701082838169::6dec523e-105d-40b2-b02f-xxxxxxxxx",
 *     "leaves_qty": 0,
 *     "price": 19236,
 *     "qty": 0.2599,
 *     "side": "buy",
 *     "symbol": "BTC/USD",
 *     "transaction_time": "2022-07-01T12:28:38.169Z",
 *     "order_id": "b7dacc39-8dcf-4cff-8387-52e4ca467283",
 *     "type": "fill"
 *   }
 * ]
 * ```
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
