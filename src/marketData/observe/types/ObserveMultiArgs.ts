import {
  MarketDataEntity,
  MarketDataRealTimeSubscriptionEntityType,
} from '@/marketData'

/**
 * Args for {@link observeMulti} request.
 * @group Market Data
 * @category Observe
 */
export type ObserveMultiArgs<T extends MarketDataEntity> = {
  symbols: string[]
  subscriptionEntityType: MarketDataRealTimeSubscriptionEntityType
  onUpdate: (update: Record<string, T>) => void
  throttleMs?: number
}
