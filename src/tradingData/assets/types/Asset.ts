/**
 * @group Trading Data
 * @category Assets
 * @see https://alpaca.markets/docs/api-references/trading-api/assets/#asset-entity
 */
export interface Asset {
  id: string
  symbol: string
  name: string
  exchange: string
  class: string
  status: string
  tradable: boolean
  marginable: boolean
  shortable: boolean
  easy_to_borrow: boolean
  fractionable: boolean
  min_order_size?: string
  min_trade_increment?: string
  price_increment?: string
}
