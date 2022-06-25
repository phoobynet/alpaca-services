export interface MarketDataSource {
  <T>(url: string, queryParams?: Record<string, string>): Promise<T>

  type: 'crypto' | 'stock'
}
