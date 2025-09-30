import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        ...globals.node,
        // Vite/build globals
        __DEV__: 'readonly',
        __PROD__: 'readonly',
        __BROWSER__: 'readonly',
        __VERSION__: 'readonly',
      },
    },
    rules: {
      // Relaxed rules for accessibility project
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_|^e$', varsIgnorePattern: '^_' }],
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'no-console': 'off', // Allow console for debugging
    },
  },
  {
    files: ['**/*.config.js', 'vite.config.js', 'vitest.config.js', 'webpack.*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.min.js',
      'wordle-debug-production.user.js',
    ],
  },
];
