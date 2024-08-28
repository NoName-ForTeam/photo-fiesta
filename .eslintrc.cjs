module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', '@it-incubator/eslint-config'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  "lines-around-comment": ["error", {
      "afterBlockComment": true,
      "afterLineComment": true,
      "beforeBlockComment": true,
      "beforeLineComment": true
    }]
  },
}
