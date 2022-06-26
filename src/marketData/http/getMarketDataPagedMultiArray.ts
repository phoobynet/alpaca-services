import { get, take } from 'lodash'
import { MarketDataSource } from '../types'
import { getPagedNestedDataProperty } from './helpers'

const DEFAULT_ABSOLUTE_LIMIT = 1_000
const PAGE_LIMIT = 1_000

/**
 * Gets data is structures as a type of Map<string, Array>.
 * @example
 * // Alpaca Raw Response
 * {
 *   "trades": {
 *     "AAPL": [
 *       {
 *         "t": "2022-04-11T14:30:00.008348Z",
 *         "x": "D",
 *         "p": 166.48,
 *         "s": 1,
 *         "c": ['@', "I"],
 *         "i": 50688,
 *         "z": "C"
 *       }
 *     ],
 *   }
 *   "next_page_token": "QUFQTHwyMDIyLTA0LTExVDE0OjMwOjAwLjAwODM0ODAwMFp8RHwwOTIyMzM3MjAzNjg1NDgyNjQ5Ng=="
 * }
 * @example
 * // Result
 * {
 *   "AAPL": [
 *     {
 *       "S": "AAPL"
 *        "t": "2022-04-11T14:30:00.008Z",
 *        "x": "D",
 *        "p": 166.48,
 *        "s": 1,
 *        "c": ['@', "I"],
 *        "i": 50688,
 *        "z": "C"
 *     }
 *   ]
 * }
 * @param {MarketDataSource} marketDataSource - the market data source
 * @param {string} url - sub path
 * @param {number} absoluteLimit - the absolute limit of items to return
 * @param {Record<string, string>} queryParams
 */
export const getMarketDataPagedMultiArray = async (
  marketDataSource: MarketDataSource,
  url: string,
  queryParams: Record<string, string> = {},
  absoluteLimit = DEFAULT_ABSOLUTE_LIMIT,
): Promise<Record<string, unknown[]>> => {
  let page_token = ''
  let nestedDataProperty: string | undefined

  const itemsMap = new Map<string, unknown[]>()

  let limit: string = (
    absoluteLimit < PAGE_LIMIT ? absoluteLimit : PAGE_LIMIT
  ).toString()

  if (queryParams.limit?.length) {
    limit = queryParams.limit
  }

  let tooBig = false

  do {
    if (tooBig) {
      return Object.fromEntries(itemsMap)
    }

    const actualQueryParams: Record<string, string> = {
      ...queryParams,
      limit,
    }

    if (page_token) {
      actualQueryParams.page_token = page_token
    }
    const data = await marketDataSource<{ next_page_token: string }>(
      url,
      actualQueryParams,
    )

    if (!nestedDataProperty) {
      nestedDataProperty = getPagedNestedDataProperty(data)
    }

    page_token = (data.next_page_token as string) ?? ''

    const mapOfData = get(data, nestedDataProperty) as Record<string, unknown[]>

    for (const [symbol, nextSymbolItems] of Object.entries(mapOfData)) {
      const newItems = [...(itemsMap.get(symbol) ?? []), ...nextSymbolItems]

      if (newItems.length >= absoluteLimit) {
        tooBig = true
      }
      itemsMap.set(symbol, take(newItems, absoluteLimit))
    }
  } while (page_token)

  return Object.fromEntries(itemsMap)
}
