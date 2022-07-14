import { ActivityType } from './ActivityType'

/**
 * @group Trading Data
 * @category Account Activity
 * @see https://alpaca.markets/docs/api-references/trading-api/account-activities/#tradeactivity-entity
 */
export interface TradeActivity {
  activity_type: ActivityType
  cum_qty: number
  id: string
  leaves_qty: number
  price: number
  qty: number
  side: string
  symbol: string
  transaction_time: Date
  order_id: string
  type: string
}
