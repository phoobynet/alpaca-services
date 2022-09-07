import { getQuotesBetween, Quote } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const iterable = getQuotesBetween({
    symbol: 'AAPL',
    start: new Date('2022-06-24 12:00:00'),
    end: new Date('2022-06-24 12:01:00'),
    absoluteLimit: 10,
  })

  const quotes: Quote[] = []

  for await (const quote of iterable) {
    quotes.push(quote)
  }

  console.log(quotes)

  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
