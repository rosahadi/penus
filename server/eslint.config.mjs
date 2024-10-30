import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        ...globals.browser,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      jest: jestPlugin,
      '@typescript-eslint': tseslint,
    },
    rules: {
      // General rules
      'prettier/prettier': 'error',
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      camelcase: 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
    env: {
      'jest/globals': true,
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
];
