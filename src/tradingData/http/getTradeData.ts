import { getTradeHttpClient } from '@/tradingData/http/getTradingHttpClient'
import { HttpResponse } from '@/http/types'

/**
 * @internal
 * @group Trading Data
 * @category HTTP
 * @param url
 * @param queryParams
 */
export const getTradeData = async <T>(
  url: string,
  queryParams?: Record<string, string>,
): Promise<HttpResponse<T>> => getTradeHttpClient().get<T>(url, queryParams)
