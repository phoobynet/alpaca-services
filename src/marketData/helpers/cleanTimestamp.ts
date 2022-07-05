import { isValid, parseISO } from 'date-fns'

export const cleanTimestamp = <T extends { t: string }>(entity: T): T => {
  const t = parseISO(entity.t)

  if (!isValid(t)) {
    throw new Error('Invalid .t value cannot be parsed using ISO format')
  }

  return {
    ...entity,
    t: t.toISOString(),
  }
}
