import { Asset } from '@/tradingData'
import {
  cryptoSource,
  MarketDataClass,
  MarketDataSource,
  usEquitySource,
} from '@/marketData'

export const getSourceFromAsset = (asset: Asset): MarketDataSource =>
  asset.class === MarketDataClass.crypto ? cryptoSource : usEquitySource
