// testUtils.js

import { vi } from 'vitest';

/**
 * Utility functions for testing the Wordle extension.
 */

/**
 * Create a mock DOM element.
 * @param {string} tagName - The tag name of the element.
 * @param {Object} attributes - The attributes to set on the element.
 * @returns {HTMLElement} The created mock DOM element.
 */
function createMockElement(tagName, attributes) {
    const element = document.createElement(tagName);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

/**
 * Create a mock for the Chrome API.
 * @returns {Object} The mock Chrome API object.
 */
function createChromeAPIMock() {
    return {
        runtime: {
            sendMessage: vi.fn(),
            onMessage: {
                addListener: vi.fn(),
            },
        },
        storage: {
            local: {
                set: vi.fn(),
                get: vi.fn(),
            },
        },
    };
}

/**
 * Helper function to simulate a click event.
 * @param {HTMLElement} element - The element to click.
 */
function simulateClick(element) {
    const event = new MouseEvent('click', { bubbles: true });
    element.dispatchEvent(event);
}

export { createMockElement, createChromeAPIMock, simulateClick };