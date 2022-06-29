import { getTradeHttpClient } from './getTradingHttpClient'

export const deleteTradeData = async (
  url: string,
  queryParams: Record<string, string>,
): Promise<void> => {
  await getTradeHttpClient().delete(url, queryParams)
}
