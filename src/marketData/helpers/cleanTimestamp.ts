import { isValid, parseISO } from 'date-fns'
import { ArgumentValidationError } from '../../common'

export const cleanTimestamp = <T extends { t: string }>(entity: T): T => {
  const t = parseISO(entity.t)

  if (!isValid(t)) {
    throw new ArgumentValidationError(
      'Invalid .t value cannot be parsed using ISO format',
    )
  }

  return {
    ...entity,
    t: t.toISOString(),
  }
}
