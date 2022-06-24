export const isValidTimeframe = (timeframe: string): boolean => {
  return /^(\d{1,2})(?:Min|Day|Week|Month|Year)$/gm.test(timeframe)
}
