/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  automock: false,
  cache: false,
  testMatch: ['**/*.spec.ts'],
}
