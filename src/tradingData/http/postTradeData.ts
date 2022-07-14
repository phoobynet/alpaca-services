import { getTradeHttpClient } from './getTradingHttpClient'
import { HttpResponse } from '../../http'

export const postTradeData = async <T>(
  url: string,
  queryParams?: Record<string, string>,
  data?: unknown,
): Promise<HttpResponse<T>> =>
  getTradeHttpClient().post<T>(url, queryParams, data)
