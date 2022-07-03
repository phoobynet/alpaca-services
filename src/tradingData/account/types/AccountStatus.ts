/**
 * @group Trading Data
 * @category Account
 * @see https://alpaca.markets/docs/api-references/trading-api/account/#account-status
 */
export enum AccountStatus {
  ONBOARDING = 'ONBOARDING',
  SUBMISSION_FAILED = 'SUBMISSION_FAILED',
  SUBMITTED = 'SUBMITTED',
  ACCOUNT_UPDATED = 'ACCOUNT_UPDATED',
  APPROVAL_PENDING = 'APPROVAL_PENDING',
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
}
