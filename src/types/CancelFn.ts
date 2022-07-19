/**
 * Alias for a function with no parameters and returns no value.
 * @group Types
 * @example
 * ```ts
 * // overly explicitly example - you wouldn't normally need to declare a type for this
 * const cancel: CancelFn = observeTrades(usEquitySource, 'AAPL', (trade: Trade) => {
 *   console.log(trade)
 * }, 500)
 *
 * setTimeout(() => {
 *   cancel()
 * }, 10_000)
 * ```
 */
export type CancelFn = () => void
