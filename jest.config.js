/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  automock: true,
  testMatch: ['<rootDir>/src/__tests__/**/*.spec.ts'],
  unmockedModulePathPatterns: ['node_modules', '/types/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
