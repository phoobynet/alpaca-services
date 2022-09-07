import first from 'lodash/first'
import { MarketDataSource } from '../types'
import { isCryptoSource } from '@/marketData'
import get from 'lodash/get'

/**
 * @group Market Data
 * @category HTTP
 */
export type MarketDataIteratorArgs<T> = {
  url: string
  absoluteLimit?: number
  queryParams?: Record<string, string>
  tidy?: (item: T) => T
}

const DEFAULT_ABSOLUTE_LIMIT = 1_000
const DEFAULT_PAGE_LIMIT = 1_000

/**
 * @internal
 * @group Market Data
 * @category HTTP
 * @param {MarketDataSource} marketDataSource
 * @param {MarketDataIteratorArgs} args
 */
export const getMarketDataIterator = <T>(
  marketDataSource: MarketDataSource,
  args: MarketDataIteratorArgs<T>,
): AsyncIterable<T> => {
  const { url, queryParams, absoluteLimit } = args

  let pages = 0
  let page_token = ''
  let items: T[] = []
  let itemsIndex = 0
  let overallCount = 0
  let remaining = absoluteLimit ?? DEFAULT_ABSOLUTE_LIMIT
  let nestedDataPath: string[] = []
  const tidy = args.tidy ?? ((item) => item)

  async function fetchNextPage(): Promise<void> {
    let _pageLimit = DEFAULT_PAGE_LIMIT
    if (queryParams?.limit?.length) {
      _pageLimit = parseInt(queryParams.limit)

      if (isNaN(_pageLimit)) {
        _pageLimit = DEFAULT_PAGE_LIMIT
      }
    }

    _pageLimit = Math.min(_pageLimit, remaining)

    const qp: Record<string, string> = {
      ...queryParams,
      limit: _pageLimit.toString(),
    }

    if (page_token) {
      qp.page_token = page_token
    }

    const result = await marketDataSource.get<Record<string, unknown>>(url, qp)

    // extract nested data property, e.g trades, quotes or bars
    if (!nestedDataPath.length) {
      nestedDataPath = [
        first(
          Object.keys(result).filter(
            (key) => ['symbol', 'next_page_token'].indexOf(key) === -1,
          ),
        ) || '',
      ]

      // inconsistent API response for crypto
      if (isCryptoSource(marketDataSource)) {
        const nestedData = get(result, nestedDataPath, {})
        const symbol = first(Object.keys(nestedData as Record<string, unknown>))

        if (symbol) {
          nestedDataPath.push(symbol)
        }
      }
    }

    if (!nestedDataPath) {
      throw new Error(
        'Expected to find a nest key called something like "trades", "quotes", "bars"',
      )
    }

    page_token = (result.next_page_token || '') as string
    items = get(result, nestedDataPath, []) as T[]
    itemsIndex = 0
  }

  return {
    [Symbol.asyncIterator](): AsyncIterator<T> {
      return {
        async next(): Promise<IteratorResult<T>> {
          if (overallCount >= (absoluteLimit || DEFAULT_ABSOLUTE_LIMIT)) {
            return {
              value: undefined,
              done: true,
            }
          }
          if (pages === 0 || (itemsIndex >= items.length && page_token)) {
            await fetchNextPage()
            pages++
          }

          if (
            items.length === 0 ||
            (itemsIndex === items.length && !page_token)
          ) {
            return {
              value: undefined,
              done: true,
            }
          }

          const item = items[itemsIndex++]

          if (!item) {
            throw new Error(
              'Bounds error retrieving item during page iteration.  This can be due to not being able to locate the nested data path which differs between equities and crypto - thanks Alpaca.',
            )
          }

          overallCount++
          remaining--

          return Promise.resolve({
            value: tidy(item),
            done: false,
          })
        },
        return() {
          return Promise.resolve({
            value: undefined,
            done: true,
          })
        },
      }
    },
  }
}
