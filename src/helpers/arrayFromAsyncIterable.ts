/**
 * Takes an async iterable and materializes the results.
 * @group Helpers
 * @param iter
 * @example
 * ```ts
 * const args: BarsBetweenArgs = {
 *   symbol: 'BTCUSD',
 *   start: new Date('2022-01-01'),
 *   end: new Date('2022-07-31'),
 *   timeframe: '1Hour',
 *   exchange: 'CBSE'
 * }
 *
 * const bars = await arrayFromAsyncIterable(getBarsBetween(cryptoSource, args))
 * ```
 */
export const arrayFromAsyncIterable = async <T>(
  iter: AsyncIterable<T>,
): Promise<T[]> => {
  const out: T[] = []

  for await (const item of iter) {
    out.push(item)
  }
  return out
}
