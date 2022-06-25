import { options } from '../../options'
import { getAccount } from '../../tradingData'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
})

async function main() {
  const account = await getAccount()
  console.log(account)
}

main().then(() => {
  process.exit(0)
})
