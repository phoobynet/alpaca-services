import get from 'lodash/get'
import { MarketDataSource } from '../types'
import { getPagedNestedDataProperty } from './helpers'

/**
 * Gets data structured as a Map<string, Object>
 * @internal
 * @example
 * // Alpaca Response
 * {
 *   "trades": {
 *     "TSLA": {
 *       "t": "2022-04-12T17:05:06.936423531Z",
 *       "x": "V",
 *       "p": 995,
 *       "s": 100,
 *       "c": ['@'],
 *       "i": 10741,
 *       "z": "C"
 *     },
 *     "AAPL": {
 *       "t": "2022-04-12T17:05:17.428334819Z",
 *       "x": "V",
 *       "p": 167.86,
 *       "s": 100,
 *       "c": ['@'],
 *       "i": 7980,
 *       "z": "C"
 *     }
 *   }
 * }
 * @example
 * // Function response
 * {
 *     "TSLA": {
 *       "t": "2022-04-12T17:05:06.936Z",
 *       "S": "TSLA",
 *       "x": "V",
 *       "p": 995,
 *       "s": 100,
 *       "c": ['@'],
 *       "i": 10741,
 *       "z": "C"
 *     },
 *     "AAPL": {
 *       "S": "AAPL",
 *       "t": "2022-04-12T17:05:17.428Z",
 *       "x": "V",
 *       "p": 167.86,
 *       "s": 100,
 *       "c": ['@'],
 *       "i": 7980,
 *       "z": "C"
 *     }
 *   }
 * }
 * @param {MarketDataSource} marketDataSource
 * @param {string} url
 * @param {Record<string, string>} [queryParams]
 */
export const getMarketDataPagedMultiObject = async (
  marketDataSource: MarketDataSource,
  url: string,
  queryParams: Record<string, string> = {},
): Promise<Record<string, unknown>> => {
  let page_token = ''
  let nestedDataProperty: string | undefined

  const itemsMap = new Map<string, unknown>()

  do {
    const actualQueryParams: Record<string, string> = {
      ...queryParams,
    }

    if (page_token) {
      actualQueryParams.page_token = page_token
    }

    const data = await marketDataSource.get<{ next_page_token: string }>(
      url,
      actualQueryParams,
    )

    page_token = (data.next_page_token as string) ?? ''

    if (!nestedDataProperty) {
      nestedDataProperty = getPagedNestedDataProperty(data)
    }

    const mapOfData = (
      nestedDataProperty ? get(data, nestedDataProperty) : data
    ) as Record<string, unknown>

    for (const [symbol, nextValue] of Object.entries(mapOfData)) {
      itemsMap.set(symbol, nextValue)
    }
  } while (page_token)

  return Object.fromEntries(itemsMap)
}
