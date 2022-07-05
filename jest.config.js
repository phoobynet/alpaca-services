/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  automock: true,
  unmockedModulePathPatterns: ['node_modules', '/types/'],
  testMatch: ['**/*.spec.ts'],
}
