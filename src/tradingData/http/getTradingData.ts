import { getTradingDataHttp } from './getTradingDataHttp'

export const getTradingData = <T>(
  url: string,
  queryParams?: Record<string, string>,
): Promise<T> => {
  return getTradingDataHttp()
    .get<T>(url, {
      params: queryParams || {},
    })
    .then((r) => r.data)
}
