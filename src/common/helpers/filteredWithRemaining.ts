/**
 *
 * @param {Array<T>} arr - array being filtered
 * @param {(t: T) => boolean} fn - the filter function
 * @returns {[T[], T[]]} - the results, index 0 contains values that matched your filter, index 1 contains any remaining values that did NOT match your filter
 */
export const filteredWithRemaining = <T>(
  arr: T[],
  fn: (t: T) => boolean,
): [T[], T[]] => {
  const filtered: T[] = []
  const remaining: T[] = []

  for (const t of arr) {
    if (fn(t)) {
      filtered.push(t)
    } else {
      remaining.push(t)
    }
  }

  return [filtered, remaining]
}
