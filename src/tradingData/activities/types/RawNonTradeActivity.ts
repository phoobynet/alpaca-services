/**
 * Raw HTTP response from Alpaca.
 * @internal
 * @group Trading Data
 * @category Account Activity
 * @see https://alpaca.markets/docs/api-references/trading-api/account-activities/#nontradeactivity-entity
 */
export interface RawNonTradeActivity {
  activity_type: string
  id: string
  date: string
  net_amount: string
  symbol: string
  qty: string
  per_share_amount: string
}
