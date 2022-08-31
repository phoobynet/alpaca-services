import { options } from '@/options'
import { streamTrades } from '@/marketData/trades/features/streamTrades'
import { Quote, streamQuotes } from '@/marketData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

export async function main() {
  try {
    const cancelTradeStream = await streamTrades(
      'AAPL',
      (trade) => {
        console.log(trade)
      },
      1_000,
    )

    const cancelQuoteStream = await streamQuotes(
      'AAPL',
      (quote: Quote) => {
        console.log(quote)
      },
      1_000,
    )

    setTimeout(() => {
      cancelTradeStream()
      cancelQuoteStream()
      process.exit(0)
    }, 10_000)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main().catch(console.error)
