export const arrayFromAsyncIterable = async <T>(
  iter: AsyncIterable<T>,
): Promise<T[]> => {
  const out: T[] = []

  for await (const item of iter) {
    out.push(item)
  }
  return out
}
