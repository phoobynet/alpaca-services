import {
  stockMarketDataSource,
  getTradesBetween,
  Trade,
} from '../../marketData'
import { options } from '../../options'
import { parseISO } from 'date-fns'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const iterable = getTradesBetween(stockMarketDataSource, {
    symbol: 'AAPL',
    absoluteLimit: 10,
    start: parseISO('2022-06-24 12:00:00'),
    end: parseISO('2022-06-24 12:00:10'),
  })

  const results: Trade[] = []

  for await (const trade of iterable) {
    results.push(trade)
  }

  console.table(results)

  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
