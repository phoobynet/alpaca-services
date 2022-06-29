import { getTradeHttpClient } from './getTradingHttpClient'

export const postTradeData = async <T>(
  url: string,
  queryParams?: Record<string, string>,
  data?: unknown,
): Promise<T> => getTradeHttpClient().post<T>(url, queryParams, data)
