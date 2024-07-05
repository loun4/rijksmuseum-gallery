module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        tabs: false,
        semi: false,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
      },
    ],
  },
}
