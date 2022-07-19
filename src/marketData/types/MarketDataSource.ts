import { MarketDataClass } from '@/marketData'

/**
 * Represents an Alpaca HTTP market data resource.
 *
 * Supported types are {@link usEquitySource}, {@link cryptoSource} and {@link newsSource}.
 * @group Market Data
 * @category HTTP
 */
export interface MarketDataSource {
  get<T>(url: string, queryParams?: Record<string, unknown>): Promise<T>

  type: MarketDataClass
}
