import { Asset } from '@/tradingData/assets/types'

/**
 * @group Trading Data
 * @category Watchlists
 * @category Poop
 */
export interface Watchlist {
  id: string
  name: string
  account_id: string
  assets: Asset[]
  created_at: string
  updated_at: string
}
