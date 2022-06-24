import { flow, toUpper, trim } from 'lodash'

export const cleanSymbol = (symbol: string): string => {
  return flow(toUpper, trim)(symbol)
}
