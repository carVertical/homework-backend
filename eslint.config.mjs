import js from '@eslint/js';
import eslintPrettierPlugin from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['.yarn/**', '.pnp.*', 'dist/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPrettierPlugin,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'max-len': ['error', { code: 120 }],
      'max-classes-per-file': 'off',
      curly: 'error',
      'no-continue': 'off',
      'no-console': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-loop-func': 'off',
      'no-labels': 'off',
      'no-bitwise': 'off',
    },
  },
];
