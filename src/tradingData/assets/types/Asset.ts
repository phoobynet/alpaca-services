export interface Asset {
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
