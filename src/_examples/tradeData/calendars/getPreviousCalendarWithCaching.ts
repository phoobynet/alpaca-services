// npm i @phoobynet/alpaca-service realm date-fns lodash
// import Realm from 'realm'
// import {
//   Calendar,
//   CalendarRepository,
//   getCalendarsBetween,
//   getPreviousCalendar,
// } from '@/tradingData'
// import { addMonths, endOfDay, subMonths } from 'date-fns'
// import { options } from '@/options'
// import { first } from 'lodash'
//
// async function main() {
//   const CalendarSchema = {
//     name: 'Calendar',
//     properties: {
//       date: 'date',
//       open: 'date',
//       close: 'date',
//       session_open: 'date',
//       session_close: 'date',
//     },
//   }
//   const realm = await Realm.open({
//     schema: [CalendarSchema],
//     inMemory: true,
//   })
//
//   const calendars = realm.objects<Calendar>('Calendar')
//
//   options.set({
//     key: process.env.APCA_API_KEY_ID as string,
//     secret: process.env.APCA_API_SECRET_KEY as string,
//     paper: true,
//   })
//
//   if (calendars.isEmpty()) {
//     await getCalendarsBetween(
//       subMonths(new Date(), 1),
//       addMonths(new Date(), 1),
//       // **** REALLY IMPORTANT - forceHttp: true, ****
//       true,
//     ).then((c) => {
//       try {
//         realm.beginTransaction()
//         c.forEach((calendar) => {
//           realm.create('Calendar', calendar)
//         })
//         realm.commitTransaction()
//       } catch (e) {
//         realm.cancelTransaction()
//         console.error(e)
//       }
//     })
//   }
//
//   const calendarRepository: CalendarRepository = {
//     async findAll(): Promise<Calendar[]> {
//       const results: Calendar[] = []
//       calendars.forEach((calendar) => {
//         results.push(calendar)
//       })
//
//       return results
//     },
//     async findBetween(startDate: Date, endDate: Date): Promise<Calendar[]> {
//       return Array.from(
//         calendars.filtered('date >= $0 AND date <= $1', startDate, endDate),
//       )
//     },
//     async find(date: Date): Promise<Calendar | undefined> {
//       return first(
//         calendars.filtered('date >= $0 AND date <= $1', date, endOfDay(date)),
//       )
//     },
//   }
//
//   // update options to include the repository
//   options.patch({
//     calendarRepository,
//   })
//
//   // get the previous calendar should now use the options.calendarRepository
//   const previousCalendar = await getPreviousCalendar()
//   console.log(JSON.stringify(previousCalendar, null, 2))
//
//   process.exit(0)
// }
//
// main().catch((e) => {
//   console.error(e)
// })
