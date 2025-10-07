// testUtils.js

import { vi } from 'vitest'

/**
 * Utility functions for testing the Wordle extension.
 */

/**
 * Create a mock DOM element.
 * @param {string} tagName - The tag name of the element.
 * @param {Object} attributes - The attributes to set on the element.
 * @returns {HTMLElement} The created mock DOM element.
 */
function createMockElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    return element
}

/**
 * Create a mock tile element with text content.
 * @param {string} letter - The letter to display in the tile.
 * @returns {HTMLElement} The created tile element.
 */
function createMockTile(letter = '') {
    const tile = document.createElement('div')
    tile.className = 'tile'
    tile.textContent = letter
    return tile
}

/**
 * Create a mock Wordle row with tiles.
 * @param {string} word - The word to display (5 letters).
 * @returns {HTMLElement} The created row element.
 */
function createMockRow(word = '') {
    const row = document.createElement('div')
    row.className = 'row'
    const letters = word.padEnd(5, '').split('')
    letters.forEach((letter) => {
        row.appendChild(createMockTile(letter.trim()))
    })
    return row
}

/**
 * Create a mock Wordle board with rows.
 * @param {string[]} words - Array of words to display.
 * @returns {HTMLElement} The created board element.
 */
function createMockBoard(words = []) {
    const board = document.createElement('div')
    board.id = 'wordle-app-game'

    const container = document.createElement('div')
    container.className = 'Board-module_boardContainer__TBHNL'

    const innerContainer = document.createElement('div')

    words.forEach((word) => {
        innerContainer.appendChild(createMockRow(word))
    })

    // Fill remaining rows with empty rows (6 total)
    const remainingRows = 6 - words.length
    for (let i = 0; i < remainingRows; i++) {
        innerContainer.appendChild(createMockRow())
    }

    container.appendChild(innerContainer)
    board.appendChild(container)

    return board
}

/**
 * Create a mock for the Chrome API.
 * @returns {Object} The mock Chrome API object.
 */
function createChromeAPIMock() {
    return {
        runtime: {
            sendMessage: vi.fn(() => Promise.resolve()),
            onMessage: {
                addListener: vi.fn(),
            },
        },
        storage: {
            local: {
                set: vi.fn((_data, callback) => {
                    if (callback) callback()
                }),
                get: vi.fn((_keys, callback) => {
                    if (callback) callback({})
                }),
            },
        },
    }
}

/**
 * Helper function to simulate a click event.
 * @param {HTMLElement} element - The element to click.
 */
function simulateClick(element) {
    const event = new MouseEvent('click', { bubbles: true })
    element.dispatchEvent(event)
}

/**
 * Wait for a specified time.
 * @param {number} ms - Milliseconds to wait.
 * @returns {Promise} Promise that resolves after the specified time.
 */
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export { createMockElement, createMockTile, createMockRow, createMockBoard, createChromeAPIMock, simulateClick, wait }
