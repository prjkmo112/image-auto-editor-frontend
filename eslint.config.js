import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'semi': ['error', 'never'],
      'prefer-const': 'error',
      'linebreak-style': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        "varsIgnorePattern": "^__",
        "argsIgnorePattern": "^__",
        "caughtErrorsIgnorePattern": "^__",
      }],

      'indent': ['error', 2],
      'require-jsdoc': 'off',
      'max-len': ["warn", {
        "code": 120, "tabWidth": 2,
        "ignoreComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreRegExpLiterals": true,
        "ignorePattern": "`[^`]+`(?:\\);)?$"
      }],
      'quotes': 'off',
      'object-curly-spacing': ["warn", "always"],
      'eol-last': ["warn", "never"],
      'no-multiple-empty-lines': ["warn", { "max": 2, "maxEOF": 0 }],
      'guard-for-in': 'off',
      'curly': ['warn', 'multi-or-nest'],
      'camelcase': ['warn', {
        "ignoreImports": true,
        "ignoreGlobals": true,
        "properties": "never"
      }]
    },
  },
)
