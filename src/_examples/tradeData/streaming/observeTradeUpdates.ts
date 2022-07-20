import { options } from '@/options'
import { observeTradeUpdates } from '@/tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

function main() {
  const cancel = observeTradeUpdates((tradeUpdate) => {
    console.log(tradeUpdate)
  })

  setTimeout(() => {
    cancel()
    process.exit(0)
  }, 60_000)
}

main()
