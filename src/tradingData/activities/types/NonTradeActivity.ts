import { ActivityType } from './ActivityType'

/**
 * @group Trading Data
 * @category Account Activity
 * @see https://alpaca.markets/docs/api-references/trading-api/account-activities/#nontradeactivity-entity
 */
export interface NonTradeActivity {
  activity_type: ActivityType
  id: string
  date: Date
  net_amount: number
  symbol: string
  qty: number
  per_share_amount: number
}
