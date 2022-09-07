import { getTradesBetween } from '@/marketData'
import { options } from '@/options'
import { parseISO, subMinutes } from 'date-fns'
import { arrayFromAsyncIterable } from '@/helpers'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const equityTrades = await arrayFromAsyncIterable(
    getTradesBetween({
      symbol: 'AAPL',
      absoluteLimit: 10,
      start: parseISO('2022-06-24 12:00:00'),
      end: parseISO('2022-06-24 12:00:10'),
    }),
  )

  console.table(equityTrades)

  const cryptoTrades = await arrayFromAsyncIterable(
    getTradesBetween({
      symbol: 'BTC/USD',
      absoluteLimit: 10,
      start: subMinutes(new Date(), 1),
      end: new Date(),
    }),
  )

  console.table(cryptoTrades)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
