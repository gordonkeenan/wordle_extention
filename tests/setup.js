// tests/setup.js

// Setup DOM mocking
import { beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
    cleanup();
});

// Mock Chrome extension API
global.chrome = {
    runtime: {
        sendMessage: jest.fn(),
        onMessage: {
            addListener: jest.fn(),
        },
    },
};

// Global test utilities
global.testUtils = {
    // Add your global test utilities here
};
