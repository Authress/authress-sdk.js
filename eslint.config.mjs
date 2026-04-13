// eslint-disable-next-line n/no-extraneous-import
import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';

import authressConfig from '@authress/eslint-config/lib/index.js';

const globalVariables = {
  ...globals.browser,
  ...globals.node,
  ...globals.es2021
};

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
    },
    plugins: {
    },
    rules: {
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
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrorsIgnorePattern: '^_+$' }],
      'no-unused-vars': ['error', { caughtErrorsIgnorePattern: '^_+$' }],
      '@typescript-eslint/no-require-imports': 'off',
      'node/no-missing-require': ['error', {
        allowModules: ['jose']
      }],
      'no-shadow': ['error'],
      'no-underscore-dangle': ['error', { allow: ['_links', '_embedded'], allowAfterThis: true }]
    }
  },

  // Declaration files: parameters are type annotations, not runtime vars; TS resolves imports
  // Must come after the **/*.ts block to override it for .d.ts files
  {
    files: ['**/*.d.ts'],
    rules: {
      'n/no-missing-import': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-redeclare': 'off',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  },

  // Test files: add vitest globals, allow devDependency imports
  {
    files: ['tests/**', 'tests_integration/**'],
    languageOptions: {
      globals: {
        describe: 'readonly', it: 'readonly', test: 'readonly',
        expect: 'readonly', beforeAll: 'readonly', afterAll: 'readonly',
        beforeEach: 'readonly', afterEach: 'readonly', vi: 'readonly'
      }
    },
    rules: {
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'off'
    }
  },

  // Build scripts: allow process.exit() and devDependency imports
  {
    files: ['make.js'],
    rules: {
      'n/no-process-exit': 'off'
    }
  }
];
