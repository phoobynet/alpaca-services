import { Bar } from '../types'
import { cleanBar } from './cleanBar'

export const cleanLatestMultiBars = (
  latestMultiBars: Record<string, unknown>,
): Record<string, Bar> => {
  const result: Record<string, Bar> = {}
  Object.keys(latestMultiBars).forEach((symbol) => {
    const bar = latestMultiBars[symbol] as Bar

    result[symbol] = cleanBar(bar, symbol)
  })

  return result
}
