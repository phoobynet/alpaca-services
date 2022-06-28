/**
 * Dynamically get a nested property from a paged data object.
 *
 * See https://alpaca.markets/docs/api-references/market-data-api/stock-pricing-data/historical/#multi-quotes
 *
 * @param {Record<string, unknown>} data
 */
export const getPagedNestedDataProperty = (
  data: Record<string, unknown>,
): string => {
  let nestedDataProperty: string | undefined

  const nestDataProperties = Object.keys(data).filter(
    (key) => key !== 'next_page_token',
  )

  if (nestDataProperties.length > 1) {
    throw new Error('Too many nested data properties')
  } else if (nestDataProperties.length === 0) {
    throw new Error('No nested data properties')
  }

  if (nestDataProperties.length) {
    nestedDataProperty = nestDataProperties[0]
  }

  if (!nestedDataProperty) {
    throw new Error('Unable to determine nested data property')
  }

  return nestedDataProperty
}
