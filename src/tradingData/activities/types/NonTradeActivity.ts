import { ActivityType } from './ActivityType'

export interface NonTradeActivity {
  activity_type: ActivityType
  id: string
  date: Date
  net_amount: number
  symbol: string
  qty: number
  per_share_amount: number
}
