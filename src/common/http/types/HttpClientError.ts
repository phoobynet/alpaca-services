/**
 * @group Common
 * @category HTTP
 */
export class HttpClientError extends Error {
  constructor(
    message: string,
    public url: string,
    public statusCode: number,
    public code?: number,
  ) {
    super(message)
    this.name = 'HttpClientError'
  }
}
