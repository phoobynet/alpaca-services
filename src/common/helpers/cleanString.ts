const PERMITTED_TYPES = ['string', 'undefined', 'object']

// typeof null === 'object'; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null

export const cleanString = (value: string | undefined | null): string => {
  const valueType = typeof value

  if (!PERMITTED_TYPES.includes(valueType)) {
    throw new Error(
      `Unable to clean string value.  Unsupported value type of "${valueType}" with value "${value}"`,
    )
  }

  return (value || '').trim()
}
