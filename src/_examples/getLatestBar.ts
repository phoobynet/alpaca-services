import { getLatestBar } from '../marketData/bars'
import { options } from '../options'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

async function main() {
  const bar = await getLatestBar('AAPL')

  console.log(bar)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
