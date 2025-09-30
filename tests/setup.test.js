// tests/setup.test.js
import { describe, it, expect, vi } from 'vitest';

describe('Test Infrastructure Verification', () => {
    it('should have Chrome API mocked', () => {
        expect(global.chrome).toBeDefined();
        expect(global.chrome.runtime).toBeDefined();
        expect(global.chrome.storage).toBeDefined();
        expect(global.chrome.tabs).toBeDefined();
    });

    it('should have vi (vitest) mock functions working', () => {
        const mockFn = vi.fn();
        mockFn('test');
        expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should have DOM environment available', () => {
        expect(document).toBeDefined();
        expect(document.body).toBeDefined();
    });

    it('should create DOM elements', () => {
        const div = document.createElement('div');
        div.textContent = 'Test';
        expect(div.textContent).toBe('Test');
    });
});
