/**
 * Returns an empty async iterator.
 * @internal
 * @group Helpers
 * @remarks this feels like a hack, but it is the only way I know to get an empty async iterator
 */
export const emptyAsyncIterator = <T>(): AsyncIterable<T> => ({
  [Symbol.asyncIterator]() {
    return {
      next() {
        return Promise.resolve({
          value: undefined,
          done: true,
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
})
