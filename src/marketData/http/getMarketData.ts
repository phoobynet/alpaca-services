import { getMarketDataHttp } from './getMarketDataHttp'

export const getMarketData = <T>(
  url: string,
  queryParams?: Record<string, string>,
): Promise<T> => {
  return getMarketDataHttp()
    .get<T>(url, {
      params: queryParams || {},
    })
    .then((r) => r.data)
}
