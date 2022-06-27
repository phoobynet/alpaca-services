import { MarketDataClass } from './MarketDataClass'

export interface MarketDataSource {
  get<T>(url: string, queryParams?: Record<string, string>): Promise<T>

  type: MarketDataClass
}
