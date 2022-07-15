import { getLatestBar, usEquitySource } from '@/marketData'
import { options } from '@/options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const latestBar = await getLatestBar(usEquitySource, {
    symbol: 'AAPL',
  })

  console.log(latestBar)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
