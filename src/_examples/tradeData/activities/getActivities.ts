import { options } from '@/options'
import { ActivityType, getActivities } from '@/tradingData'
import { subYears } from 'date-fns'

options.set({
  key: process.env.APCA_API_KEY_ID as string,
  secret: process.env.APCA_API_SECRET_KEY as string,
  paper: true,
})

async function main(): Promise<void> {
  const activities = await getActivities({
    activity_types: [ActivityType.FILL, ActivityType.DIV],
    after: subYears(new Date(), 1),
    direction: 'desc',
    page_size: 3,
  })

  console.log(JSON.stringify(activities, null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
