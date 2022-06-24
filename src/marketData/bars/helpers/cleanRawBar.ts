import { Bar, RawBar } from '../types'

export const cleanRawBar = (rawBar: RawBar): Bar => {
  return {
    ...rawBar.bar,
    S: rawBar.symbol,
  }
}
