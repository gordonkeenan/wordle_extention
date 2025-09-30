// tests/setup.js

// Setup DOM mocking
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
    // Clean up DOM between tests
    document.body.innerHTML = '';
});

// Mock Chrome extension API
global.chrome = {
    runtime: {
        sendMessage: vi.fn(),
        onMessage: {
            addListener: vi.fn(),
        },
    },
    storage: {
        local: {
            get: vi.fn(),
            set: vi.fn(),
        },
    },
    tabs: {
        sendMessage: vi.fn(),
    },
};

// Global test utilities
global.testUtils = {
    // Add your global test utilities here
};
