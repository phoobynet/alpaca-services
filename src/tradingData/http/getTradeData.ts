import { getTradeHttpClient } from './getTradingHttpClient'

export const getTradeData = async <T>(
  url: string,
  queryParams?: Record<string, string>,
): Promise<T> => getTradeHttpClient().get<T>(url, queryParams)
