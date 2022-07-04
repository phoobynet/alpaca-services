import first from 'lodash/first'
import { MarketDataSource } from '../types'

export type MarketDataIteratorArgs<T> = {
  url: string
  absoluteLimit?: number
  queryParams?: Record<string, string>
  tidy?: (item: T) => T
}

const DEFAULT_ABSOLUTE_LIMIT = 1_000
const DEFAULT_PAGE_LIMIT = 1_000

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
  let nestedDataProperty = ''
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
    if (!nestedDataProperty) {
      nestedDataProperty =
        first(
          Object.keys(result).filter(
            (key) => ['symbol', 'next_page_token'].indexOf(key) === -1,
          ),
        ) || ''
    }

    if (!nestedDataProperty) {
      throw new Error(
        'Expected to find a nest key called something like "trades", "quotes", "bars"',
      )
    }

    page_token = (result.next_page_token || '') as string
    items = (result[nestedDataProperty] || []) as T[]
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
              'Bounds error retrieving item during page iteration',
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
