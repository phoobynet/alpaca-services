import { options } from '@/options'
import { getMarketStatus, observeMarketStatus } from '@/tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  console.log('Get the current market status...')
  await getMarketStatus().then((status) => {
    console.log(JSON.stringify(status, null, 2))
  })

  console.log('\n\nObserve the market status...')
  const cancel = observeMarketStatus((marketStatus) => {
    console.log(marketStatus)
  })

  setTimeout(() => {
    console.log('Stopping...')
    cancel()
    process.exit(0)
    console.log('Stopping...DONE')
  }, 5_000)
}

main().catch(console.error)
