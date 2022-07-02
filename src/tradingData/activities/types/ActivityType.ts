/**
 * Activity types for account trade and non-trade activities.
 *
 * See https://alpaca.markets/docs/api-references/trading-api/account-activities/#activity-types
 */
export enum ActivityType {
  /**
   * Order fills (both partial and full fills)
   */
  FILL = 'FILL',
  /**
   * Cash transactions (both CSD and CSW)
   */
  TRANS = 'TRANS',
  /**
   * Miscellaneous or rarely used activity types (All types except those in TRANS, DIV, or FILL)
   */
  MISC = 'MISC',
  /**
   * ACATS IN/OUT (Cash)
   */
  ACATC = 'ACATC',
  /**
   * ACATS IN/OUT (Securities)
   */
  ACATS = 'ACATS',
  /**
   * Cash deposit(+)
   */
  CSD = 'CSD',
  /**
   * Cash withdrawal(-)
   */
  CSW = 'CSW',
  /**
   * Dividends
   */
  DIV = 'DIV',
  /**
   * Dividend (capital gain long term)
   */
  DIVCGL = 'DIVCGL',
  /**
   * Dividend (capital gain short term)
   */
  DIVCGS = 'DIVCGS',
  /**
   * Dividend fee
   */
  DIVFEE = 'DIVFEE',
  /**
   * Dividend adjusted (Foreign Tax Withheld)
   */
  DIVFT = 'DIVFT',
  /**
   * Dividend adjusted (NRA Withheld)
   */
  DIVNRA = 'DIVNRA',
  /**
   * Dividend return of capital
   */
  DIVROC = 'DIVROC',
  /**
   * Dividend adjusted (Tefra Withheld)
   */
  DIVTW = 'DIVTW',
  /**
   * Dividend (tax exempt)
   */
  DIVTXEX = 'DIVTXEX',
  /**
   * Interest (credit/margin)
   */
  INT = 'INT',
  /**
   * Interest adjusted (NRA Withheld)
   */
  INTNRA = 'INTNRA',
  /**
   * Interest adjusted (Tefra Withheld)
   */
  INTTW = 'INTTW',
  /**
   * Journal entry
   */
  JNL = 'JNL',
  /**
   * Journal entry (cash)
   */
  JNLC = 'JNLC',
  /**
   * Journal entry (stock)
   */
  JNLS = 'JNLS',
  /**
   * Merger/Acquisition
   */
  MA = 'MA',
  /**
   * Name change
   */
  NC = 'NC',
  /**
   * Option assignment
   */
  OPASN = 'OPASN',
  /**
   * Option expiration
   */
  OPEXP = 'OPEXP',
  /**
   * Option exercise
   */
  OPXRC = 'OPXRC',
  /**
   * Pass Thru Charge
   */
  PTC = 'PTC',
  /**
   * Pass Thru Rebate
   */
  PTR = 'PTR',
  /**
   * Reorg CA
   */
  REORG = 'REORG',
  /**
   * Symbol change
   */
  SC = 'SC',
  /**
   * Stock spinoff
   */
  SSO = 'SSO',
  /**
   * Stock split
   */
  SSP = 'SSP',
}
