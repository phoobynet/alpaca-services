import { observeBars } from '../../marketData'
import { options } from '../../options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

function main() {
  const cancel = observeBars('crypto', 'BTCUSD', (bar) => {
    console.log(bar)
  })

  setTimeout(() => {
    cancel()
    process.exit(0)
  }, 120_000)
}

main()
