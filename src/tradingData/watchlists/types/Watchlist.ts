import { Asset } from '../../assets'

export interface Watchlist {
  id: string
  name: string
  account_id: string
  assets: Asset[]
  created_at: string
  updated_at: string
}
