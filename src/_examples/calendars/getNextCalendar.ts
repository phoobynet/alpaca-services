import { options } from '../../options'
import { getNextCalendar } from '../../tradingData/calendars/features'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

async function main() {
  const nextCalendar = await getNextCalendar()

  console.log(nextCalendar)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})