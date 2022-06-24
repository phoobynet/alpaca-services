import { getMarketDataHttp } from './getMarketDataHttp'
import { first } from 'lodash'

export type MarketDataIteratorArgs<T> = {
  url: string
  absoluteLimit?: number
  queryParams?: Record<string, string>
  tidy?: (item: T) => T
}

const DEFAULT_ABSOLUTE_LIMIT = 1_000
const DEFAULT_PAGE_LIMIT = 1_000

export const getMarketDataIterator = <T>(
  args: MarketDataIteratorArgs<T>,
): AsyncIterable<T> => {
  const http = getMarketDataHttp()
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

    const result = await http
      .get(url, {
        params: qp,
      })
      .then((r) => r.data)

    nestedDataProperty =
      first(
        Object.keys(result).filter(
          (key) => ['symbol', 'next_page_token'].indexOf(key) === -1,
        ),
      ) || ''

    if (!nestedDataProperty) {
      throw new Error('Expected to find a key')
    }

    page_token = result.next_page_token || ''
    items = result[nestedDataProperty] || []
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
