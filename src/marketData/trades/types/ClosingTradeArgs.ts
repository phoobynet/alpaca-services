import { Calendar } from '@/tradingData'

export type ClosingTradeArgs = {
  symbol: string
  calendar: Calendar
  /**
   * crypto only optional
   */
  exchanges?: string[]

  /**
   * stock only optional
   */
  feed?: string
}
