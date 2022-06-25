import { Calendar } from '../types'
import { getCalendarFor } from './getCalendarFor'

export const getCalendarForToday = async (): Promise<Calendar | undefined> => {
  return getCalendarFor(new Date())
}
