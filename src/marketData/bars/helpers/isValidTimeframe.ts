const r = /^(\d{1,2})(?:Min|Day|Week|Month|Year)$/gm

export const isValidTimeframe = (timeframe: string): boolean =>
  r.test(timeframe)
