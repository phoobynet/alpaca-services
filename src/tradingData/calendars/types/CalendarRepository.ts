import { Calendar } from './Calendar'

/**
 * An interface for a repository of {@link Calendar}s.
 *
 * Provide your own cache implementation to avoid HTTP requests.
 * @group Trading Data
 * @category Calendars
 * @example
 * The following example shows how to use a custom cache implementation to avoid HTTP requests using the <a href="http://dexie.org" target="_blank">Dexie</a> indexeddb wrapper.
 *
 * ### Dependencies
 *
 * ```bash
 * npm i date-fns dexie
 * ```
 *
 * ### calendarRepository.ts
 *
 * ```ts
 * import Dexie from 'dexie'
 * import type { Asset, Calendar } from '@phoobynet/alpaca-services'
 * import type { Calendar, CalendarRepository } from '@phoobynet/alpaca-services'
 * import { database } from '@/libs/database'
 * import { getCalendarsBetween } from '@phoobynet/alpaca-services'
 * import { subYears, addYears, formatISO } from 'date-fns'
 *
 * class Database extends Dexie {
 *   public calendars!: Dexie.Table<Calendar>
 *   public assets!: Dexie.Table<Asset>
 *
 *   constructor() {
 *     super('AlpacaServicesDatabase')
 *
 *     this.version(1).stores({
 *       calendars: 'id,date',
 *       assets:
 *         'id,class,status,symbol,exchange,name,tradable,shortable,marginable,easy_to_borrow',
 *     })
 *   }
 * }
 *
 * export const database = new Database()
 *
 * const database = new Database()
 *
 * let isReady = false
 *
 * const isEmpty = async () => {
 *   if (!isReady) {
 *     const c = await database.calendars.count()
 *     if (c === 0) {
 *       const start = subYears(new Date(), 1)
 *       const end = addYears(new Date(), 1)
 *       const calendars = await getCalendarsBetween(start, end, true)
 *       await database.calendars.bulkPut(
 *         calendars.map((c) => {
 *           return {
 *             id: formatISO(c.date, { representation: 'date' }),
 *             ...c,
 *           }
 *         }),
 *       )
 *     }
 *     isReady = true
 *   }
 * }
 *
 * export const calendarRepository: CalendarRepository = {
 *   async find(date: Date): Promise<Calendar | undefined> {
 *     await isEmpty()
 *     return database.calendars
 *       .where('id')
 *       .equals(formatISO(date, { representation: 'date' }))
 *       .first()
 *   },
 *   async findAll(): Promise<Calendar[]> {
 *     await isEmpty()
 *     return database.calendars.toArray()
 *   },
 *   async findBetween(startDate: Date, endDate: Date): Promise<Calendar[]> {
 *     await isEmpty()
 *
 *     return database.calendars
 *       .where('id')
 *       .between(
 *         formatISO(startDate, { representation: 'date' }),
 *         formatISO(endDate, { representation: 'date' }),
 *         true,
 *         true,
 *       )
 *       .toArray()
 *   },
 * }
 * ```
 */
export interface CalendarRepository {
  find(date: Date): Promise<Calendar | undefined>

  findBetween(startDate: Date, endDate: Date): Promise<Calendar[]>

  findAll(): Promise<Calendar[]>
}
