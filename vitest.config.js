import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./tests/setup.js'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'tests/', 'dist/', 'build/', '*.config.js'],
        },
    },
    define: {
        __DEV__: true,
        __PROD__: false,
    },
})
