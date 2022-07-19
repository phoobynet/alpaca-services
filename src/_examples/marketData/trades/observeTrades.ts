import { cryptoSource, observeTrades, Trade } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

function main() {
  // observers return a cancel function that can be called to stop the observation
  const cancel = observeTrades(
    cryptoSource,
    'BTCUSD',
    // handler
    (trade: Trade): void => {
      console.log(JSON.stringify(trade, null, 2))
    },
    // throttleMs: 500,
    500,
  )

  // observe for 10 seconds
  setTimeout(() => {
    // remember to cancel the subscription
    cancel()
    process.exit(0)
  }, 10_000)
}

main()
