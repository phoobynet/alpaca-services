/**
 * Raw HTTP response from Alpaca.
 * @group Trading Data
 * @category Account Activity
 * @see https://alpaca.markets/docs/api-references/trading-api/account-activities/#tradeactivity-entity
 */
export interface RawTradeActivity {
  activity_type: string
  cum_qty: string
  id: string
  leaves_qty: string
  price: string
  qty: string
  side: string
  symbol: string
  transaction_time: string
  order_id: string
  type: string
}
