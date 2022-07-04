async function foo(): Promise<void> {
  throw new Error('bar')
}

describe('async thrown error test', () => {
  it('should throw error', async () => {
    return expect(foo()).rejects.toThrow('bar')
  })
})
