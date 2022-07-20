/**
 * @group Trading Data
 * @category Orders
 */
export type OrdersArgs = {
  status?: 'open' | 'closed' | 'all'
  limit?: number
  after?: string
  until?: Date
  direction?: 'asc' | 'desc'
  nested?: boolean
  side?: 'buy' | 'sell'
  symbols?: string[]
}
