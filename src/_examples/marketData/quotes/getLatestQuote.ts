import { usEquitySource } from '../../../marketData'
import { options } from '../../../options'
import { getLatestQuote } from '../../../marketData/quotes'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main() {
  const data = await getLatestQuote(usEquitySource, 'AAPL')

  console.log(data)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
})
