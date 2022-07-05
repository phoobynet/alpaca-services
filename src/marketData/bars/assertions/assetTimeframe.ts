import { isValidTimeframe } from '../helpers'

export const assetTimeframe = (timeframe: string): void => {
  if (!isValidTimeframe(timeframe)) {
    throw new Error(
      `Invalid timeframe, expected something like 1Min, 1Hour, 1Day, 1Week, 1Year etc., but got ${timeframe}`,
    )
  }
}
