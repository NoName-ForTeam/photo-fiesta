module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-empty-object-type': 'warn',
    'no-empty-pattern': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
  },
}
