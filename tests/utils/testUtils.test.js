// tests/utils/testUtils.test.js
import { describe, it, expect } from 'vitest';
import { createMockElement, createChromeAPIMock, simulateClick } from './testUtils.js';

describe('Test Utilities', () => {
    describe('createMockElement', () => {
        it('should create an element with attributes', () => {
            const element = createMockElement('div', { id: 'test', class: 'test-class' });
            expect(element.tagName).toBe('DIV');
            expect(element.getAttribute('id')).toBe('test');
            expect(element.getAttribute('class')).toBe('test-class');
        });
    });

    describe('createChromeAPIMock', () => {
        it('should create Chrome API mock with required methods', () => {
            const chromeMock = createChromeAPIMock();
            expect(chromeMock.runtime).toBeDefined();
            expect(chromeMock.runtime.sendMessage).toBeDefined();
            expect(chromeMock.storage.local.get).toBeDefined();
            expect(chromeMock.storage.local.set).toBeDefined();
        });
    });

    describe('simulateClick', () => {
        it('should trigger click event on element', () => {
            const element = document.createElement('button');
            let clicked = false;
            element.addEventListener('click', () => {
                clicked = true;
            });
            
            simulateClick(element);
            expect(clicked).toBe(true);
        });
    });
});
