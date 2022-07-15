import { isValid, parseISO } from 'date-fns'

/**
 * Ensures timestamp consistency, parsing it to 1,000th of a second.
 * @group Market Data
 * @category Helpers
 * @param entity
 */
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
