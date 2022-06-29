import { getTradeHttpClient } from './getTradingHttpClient'

export const putTradeData = async <T>(
  url: string,
  queryParams?: Record<string, string>,
  data?: unknown,
): Promise<T> => getTradeHttpClient().put<T>(url, queryParams, data)
