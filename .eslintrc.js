module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/no-floating-promises': ['error'],
  },
  overrides: [
    Object.assign(
      {
        files: ['**/*.spec.ts'],
        env: { jest: true },
        plugins: ['jest'],
      },
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('eslint-plugin-jest').configs.recommended,
    ),
  ],
}
