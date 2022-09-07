import { cryptoSource, observeQuotes, Quote } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const cancel = observeQuotes(
    cryptoSource,
    'BTCUSD',
    (quote: Quote): void => {
      console.log(quote)
    },
    1000,
  )

  setTimeout(() => {
    cancel()
    process.exit(0)
  }, 10_000)
}

main().catch((e) => {
  console.error(e)
})
