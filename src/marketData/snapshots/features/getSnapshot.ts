import { Snapshot, SnapshotArgs } from '@/marketData/snapshots/types'
import { cleanSnapshot } from '@/marketData/snapshots/helpers'
import { getSource, isCryptoSource } from '@/marketData'
import { cleanSymbol } from '@/marketData/helpers'

/**
 * @group Market Data
 * @category Snapshots
 * @param {SnapshotArgs} args
 */
export const getSnapshot = async (args: SnapshotArgs): Promise<Snapshot> => {
  const { symbol, ...theRest } = args

  const cleanedSymbol = cleanSymbol(symbol)
  const source = await getSource(cleanedSymbol)
  const queryParams: Record<string, string> = {
    ...theRest,
  }

  if (isCryptoSource(source)) {
    const url = '/snapshots'
    queryParams.symbols = symbol
    return source
      .get<{ snapshots: Record<string, Snapshot> }>(url, queryParams)
      .then((response) => response.snapshots[symbol])
      .then((snapshot) => {
        return cleanSnapshot(snapshot, symbol)
      })
  } else {
    const url = `${symbol}/snapshot`
    return source.get<Snapshot>(url, queryParams).then((snapshot) => {
      return cleanSnapshot(snapshot, symbol)
    })
  }
}
