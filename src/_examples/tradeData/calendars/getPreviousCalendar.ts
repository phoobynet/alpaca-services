import { options } from '@/options'
import { getPreviousCalendar } from '@/tradingData'
import { differenceInMinutes } from 'date-fns'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const cal = await getPreviousCalendar()

  const { session_open, session_close } = cal

  const diff = differenceInMinutes(session_open, session_close)
  console.log(`Minutes: ${diff}`)

  console.log(cal)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
