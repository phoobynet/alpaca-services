import { options } from '../../options'
import { getPreviousCalendar } from '../../tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const cal = await getPreviousCalendar()

  console.log(cal)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
