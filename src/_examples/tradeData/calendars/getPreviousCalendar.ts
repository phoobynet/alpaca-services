import { options } from '@/options'
import { getPreviousCalendar } from '@/tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  // retrieve directly from Alpaca's API
  const previousCalendar = await getPreviousCalendar()
  console.log(JSON.stringify(previousCalendar, null, 2))

  process.exit(1)
}

main().catch((e) => {
  console.error(e)
})
