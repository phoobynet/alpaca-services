import { getTradeHttpClient } from './getTradingHttpClient'
import { HttpResponse } from '../../http'

export const putTradeData = async <T>(
  url: string,
  queryParams?: Record<string, string>,
  data?: unknown,
): Promise<HttpResponse<T>> =>
  getTradeHttpClient().put<T>(url, queryParams, data)
