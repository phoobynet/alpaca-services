import {
  cleanSymbol,
  getSource,
  isCryptoSource,
  MultiSnapshotsArgs,
  Snapshot,
} from '@/marketData'
import { chunk } from 'lodash'
import first from 'lodash/first'
import { cleanSnapshot } from '@/marketData/snapshots/helpers'

export const getMultiSnapshot = async (
  args: MultiSnapshotsArgs,
): Promise<Record<string, Snapshot>> => {
  const cleanedSymbols = args.symbols.map(cleanSymbol)

  const leadingSymbol = first(cleanedSymbols)

  if (!leadingSymbol) {
    return {}
  }

  const source = await getSource(leadingSymbol)

  const symbolsChunk = chunk(cleanedSymbols, 300)

  let snapshots: Record<string, Snapshot> = {}

  const url = '/snapshots'

  for (const symbols of symbolsChunk) {
    const queryParams: Record<string, string> = {
      symbols: symbols.join(','),
    }

    if (args.feed && !isCryptoSource(source)) {
      queryParams.feed = args.feed
    }

    await source.get<Record<string, Snapshot>>(url, queryParams).then((s) => {
      snapshots = {
        ...snapshots,
        ...s,
      }
    })
  }

  for (const symbol of cleanedSymbols) {
    snapshots[symbol] = cleanSnapshot(snapshots[symbol], symbol)
  }

  return snapshots
}
