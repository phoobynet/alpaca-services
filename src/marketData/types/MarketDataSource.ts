import { MarketDataClass } from '@/marketData'

export interface MarketDataSource {
  get<T>(url: string, queryParams?: Record<string, unknown>): Promise<T>

  type: MarketDataClass
}
