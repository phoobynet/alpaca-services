import { getTradeHttpClient } from './getTradingHttpClient'
import { HttpResponse } from '../../http'

export const deleteTradeData = async (
  url: string,
  queryParams: Record<string, string>,
): Promise<HttpResponse<void>> => getTradeHttpClient().delete(url, queryParams)
