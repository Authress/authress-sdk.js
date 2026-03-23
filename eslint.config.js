import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';

import authressConfig from '@authress/eslint-config/lib/index.js';
import importPlugin from 'eslint-plugin-import';

const globalVariables = {
  ...globals.browser,
  ...globals.es2021,
  fetch: 'readonly'
};

// Fix lint problem, this key has an issue, so just delete it
delete globalVariables['AudioWorkletGlobalScope '];

export default [
  ...tseslint.configs.recommended,
  ...authressConfig,

  // 1. Global ignores
  {
    ignores: ['node_modules/']
  },

  {
    // Configuration object for JavaScript files
    files: ['make.js', '**/*.js', '**/*.ts'],

    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        requireConfigFile: false
      },
      globals: globalVariables
    },
    settings: {
      "import/resolver": {
        node: true
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      // Your custom rules go here
      'arrow-parens': ['error', 'as-needed'],
      'indent': ['error', 2, { SwitchCase: 1, MemberExpression: 'off' }],
      'node/no-unsupported-features/es-syntax': 'off',
      'no-throw-literal': 'off',
      'spaced-comment': 'off',
      'no-continue': 'off',
      'require-atomic-updates': 'off',
      'no-constant-condition': ['error', { checkLoops: false }],
      'quotes': 'off',
      'n/no-unpublished-import': ['error'],
      'n/no-unsupported-features/node-builtins': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'caughtErrorsIgnorePattern': '^_+$' }],
      'no-unused-vars': ['error', { 'caughtErrorsIgnorePattern': '^_+$' }],
      '@typescript-eslint/no-require-imports': 'off'
    }
  },

  // 4. Your specific override for test files and scripts
  {
    files: ['make.js', 'tests/**'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
    }
  }
];