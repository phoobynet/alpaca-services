import { options } from '@/options'
import { getNextCalendar } from '@/tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const nextCalendar = await getNextCalendar()

  console.log(nextCalendar)

  // should use the in memory cache
  console.log(await getNextCalendar())
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
