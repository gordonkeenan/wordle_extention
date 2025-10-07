// tests/setup.js

// Setup DOM mocking
import { beforeEach, vi } from 'vitest'

beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = ''
    document.head.innerHTML = ''
})

// Mock Chrome extension API
global.chrome = {
    runtime: {
        sendMessage: vi.fn(() => Promise.resolve()),
        onMessage: {
            addListener: vi.fn(),
        },
    },
    storage: {
        local: {
            get: vi.fn((_keys, callback) => {
                if (callback) callback({})
            }),
            set: vi.fn((_data, callback) => {
                if (callback) callback()
            }),
        },
    },
}

// Mock __DEV__ and __PROD__ globals
global.__DEV__ = true
global.__PROD__ = false
