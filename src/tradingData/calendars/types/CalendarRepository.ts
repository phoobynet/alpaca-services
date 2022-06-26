import { Calendar } from './Calendar'

export interface CalendarRepository {
  find(date: Date): Promise<Calendar | undefined>

  findBetween(startDate: Date, endDate: Date): Promise<Calendar[]>

  findAll(): Promise<Calendar[]>
}
