import { formatISO } from 'date-fns'

export const formatISODate = (date: Date): string =>
  formatISO(date, { representation: 'date' })
