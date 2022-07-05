import { getTradeHttpClient } from './getTradingHttpClient'
import { HttpResponse } from '../../http'

export const getTradeData = async <T>(
  url: string,
  queryParams?: Record<string, string>,
): Promise<HttpResponse<T>> => getTradeHttpClient().get<T>(url, queryParams)
