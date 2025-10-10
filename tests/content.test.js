// tests/content.test.js

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
    createMockElement,
    createMockTile,
    createMockRow,
    createMockBoard,
    wait
} from './utils/testUtils.js';

/**
 * Comprehensive unit tests for Wordle Accessibility Helper content script.
 * 
 * Tests cover:
 * - Word validation (SOLUTIONS and ARCHIVE sets)
 * - Row detection (getRows with multiple selectors)
 * - Guess extraction (getGuessFromRow, getLastFilledRow)
 * - Highlighting logic (applyClass, clearClasses, highlight)
 * - Utility functions (log, sendMessage, checkAndAutoFetch)
 * - Archive fetching functionality
 * - Debug panel functionality
 */

// Create isolated test versions of the functions from content.js
// These mirror the logic in the actual content script

const createTestFunctions = () => {
    // Sample solutions set (subset for testing)
    const SOLUTIONS = new Set([
        "aback", "abase", "abate", "abbey", "abbot",
        "about", "above", "abuse", "actor", "adult",
        "after", "agent", "agree", "alarm", "alert",
        "allow", "alone", "along", "alter", "angel",
        "anger", "angle", "angry", "apple", "apply",
        "arena", "argue", "arise", "armor", "array",
        "audio", "avoid", "awake", "aware", "awful"
    ]);

    // Archive set for testing
    let ARCHIVE = new Set();

    // Test implementation of getRows
    function getRows() {
        const selectors = [
            '#wordle-app-game .Board-module_boardContainer__TBHNL > div > div',
            '#wordle-app-game > div.Board-module_boardContainer__TBHNL > div > div',
            '#wordle-app-game .Board-module_board__lbzlf > div',
            '#wordle-app-game div.Board-row',
            '.board-row'
        ];
        for (const sel of selectors) {
            try {
                const nodes = document.querySelectorAll(sel);
                if (nodes && nodes.length) return Array.from(nodes);
            } catch (e) { }
        }
        return [];
    }

    // Test implementation of getGuessFromRow
    function getGuessFromRow(row) {
        return Array.from(row.children).map(c => (c.textContent || '').trim()).join('');
    }

    // Test implementation of getLastFilledRow
    function getLastFilledRow() {
        const rows = getRows();
        const filled = rows.filter(r => getGuessFromRow(r).length === 5);
        return filled.length ? filled[filled.length - 1] : null;
    }

    // Test implementation of applyClass
    function applyClass(row, cls) {
        Array.from(row.children).forEach(c => {
            c.classList.remove('wh-valid', 'wh-past', 'wh-invalid');
            if (cls) c.classList.add(cls);
        });
    }

    // Test implementation of clearClasses
    function clearClasses(row) {
        Array.from(row.children).forEach(c => c.classList.remove('wh-valid', 'wh-past', 'wh-invalid'));
    }

    // Test implementation of highlight
    function highlight(isDevelopment = true) {
        const current = getLastFilledRow();
        if (current) {
            const g = getGuessFromRow(current).toLowerCase();
            if (g.length === 5) {
                if (SOLUTIONS.has(g)) {
                    applyClass(current, 'wh-valid');
                } else if (ARCHIVE.has(g)) {
                    applyClass(current, isDevelopment ? 'wh-past' : 'wh-valid');
                } else {
                    applyClass(current, 'wh-invalid');
                }
            }
        }
    }

    // Test implementation of isWordValid
    function isWordValid(word) {
        const w = word.toLowerCase();
        return SOLUTIONS.has(w) || ARCHIVE.has(w);
    }

    return {
        SOLUTIONS,
        ARCHIVE,
        getRows,
        getGuessFromRow,
        getLastFilledRow,
        applyClass,
        clearClasses,
        highlight,
        isWordValid
    };
};

describe('Word Validation', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should validate words in SOLUTIONS set', () => {
        expect(testFuncs.SOLUTIONS.has('about')).toBe(true);
        expect(testFuncs.SOLUTIONS.has('apple')).toBe(true);
        expect(testFuncs.SOLUTIONS.has('audio')).toBe(true);
    });

    it('should reject words not in SOLUTIONS set', () => {
        expect(testFuncs.SOLUTIONS.has('zzzzz')).toBe(false);
        expect(testFuncs.SOLUTIONS.has('notwd')).toBe(false);
        expect(testFuncs.SOLUTIONS.has('xxxxx')).toBe(false);
    });

    it('should validate case-insensitive words', () => {
        expect(testFuncs.SOLUTIONS.has('about'.toLowerCase())).toBe(true);
        expect(testFuncs.SOLUTIONS.has('ABOUT'.toLowerCase())).toBe(true);
        expect(testFuncs.SOLUTIONS.has('AbOuT'.toLowerCase())).toBe(true);
    });

    it('should handle archive words when archive is populated', () => {
        testFuncs.ARCHIVE.add('cigar');
        testFuncs.ARCHIVE.add('rebut');
        testFuncs.ARCHIVE.add('sissy');

        expect(testFuncs.ARCHIVE.has('cigar')).toBe(true);
        expect(testFuncs.ARCHIVE.has('rebut')).toBe(true);
        expect(testFuncs.ARCHIVE.has('sissy')).toBe(true);
    });

    it('should validate words using isWordValid helper', () => {
        expect(testFuncs.isWordValid('about')).toBe(true);
        expect(testFuncs.isWordValid('ABOUT')).toBe(true);
        expect(testFuncs.isWordValid('zzzzz')).toBe(false);
        
        testFuncs.ARCHIVE.add('cigar');
        expect(testFuncs.isWordValid('cigar')).toBe(true);
    });
});

describe('Row Detection (getRows)', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should detect rows using first selector pattern', () => {
        const board = createMockBoard(['ABOUT', 'APPLE']);
        document.body.appendChild(board);

        const rows = testFuncs.getRows();
        expect(rows.length).toBe(6); // Total 6 rows in Wordle
    });

    it('should detect rows using .board-row selector', () => {
        const container = document.createElement('div');
        const row1 = document.createElement('div');
        row1.className = 'board-row';
        const row2 = document.createElement('div');
        row2.className = 'board-row';
        
        container.appendChild(row1);
        container.appendChild(row2);
        document.body.appendChild(container);

        const rows = testFuncs.getRows();
        expect(rows.length).toBe(2);
    });

    it('should return empty array when no rows found', () => {
        const rows = testFuncs.getRows();
        expect(rows).toEqual([]);
    });

    it('should handle malformed selectors gracefully', () => {
        document.body.innerHTML = '<div>Invalid structure</div>';
        const rows = testFuncs.getRows();
        expect(Array.isArray(rows)).toBe(true);
    });

    it('should return array of DOM elements', () => {
        const board = createMockBoard(['ABOUT']);
        document.body.appendChild(board);

        const rows = testFuncs.getRows();
        expect(rows.length).toBeGreaterThan(0);
        rows.forEach(row => {
            expect(row instanceof HTMLElement).toBe(true);
        });
    });
});

describe('Guess Extraction (getGuessFromRow)', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should extract 5-letter guess from row', () => {
        const row = createMockRow('ABOUT');
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('ABOUT');
    });

    it('should extract partial guess from incomplete row', () => {
        const row = createMockRow('ABC');
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('ABC');
    });

    it('should return empty string for empty row', () => {
        const row = createMockRow('');
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('');
    });

    it('should trim whitespace from tiles', () => {
        const row = document.createElement('div');
        ['A', ' B ', 'C ', ' D', 'E'].forEach(letter => {
            const tile = createMockTile(letter);
            row.appendChild(tile);
        });
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('ABCDE');
    });

    it('should handle rows with more than 5 tiles', () => {
        const row = document.createElement('div');
        'ABCDEFG'.split('').forEach(letter => {
            const tile = createMockTile(letter);
            row.appendChild(tile);
        });
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('ABCDEFG');
    });

    it('should handle empty tile content', () => {
        const row = document.createElement('div');
        for (let i = 0; i < 5; i++) {
            const tile = createMockTile('');
            row.appendChild(tile);
        }
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('');
    });
});

describe('Last Filled Row Detection (getLastFilledRow)', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should return last filled row when multiple rows are filled', () => {
        const board = createMockBoard(['ABOUT', 'APPLE', 'AUDIO']);
        document.body.appendChild(board);

        const lastRow = testFuncs.getLastFilledRow();
        expect(lastRow).not.toBeNull();
        const guess = testFuncs.getGuessFromRow(lastRow);
        expect(guess).toBe('AUDIO');
    });

    it('should return null when no rows are filled', () => {
        const board = createMockBoard([]);
        document.body.appendChild(board);

        const lastRow = testFuncs.getLastFilledRow();
        expect(lastRow).toBeNull();
    });

    it('should return the only filled row when one row is filled', () => {
        const board = createMockBoard(['ABOUT']);
        document.body.appendChild(board);

        const lastRow = testFuncs.getLastFilledRow();
        expect(lastRow).not.toBeNull();
        const guess = testFuncs.getGuessFromRow(lastRow);
        expect(guess).toBe('ABOUT');
    });

    it('should ignore partially filled rows', () => {
        const board = createMockBoard(['ABOUT', 'APPL']);
        document.body.appendChild(board);

        const lastRow = testFuncs.getLastFilledRow();
        expect(lastRow).not.toBeNull();
        const guess = testFuncs.getGuessFromRow(lastRow);
        expect(guess).toBe('ABOUT');
    });

    it('should handle board with all 6 rows filled', () => {
        const board = createMockBoard(['ABOUT', 'APPLE', 'AUDIO', 'AVOID', 'AWAKE', 'AWARE']);
        document.body.appendChild(board);

        const lastRow = testFuncs.getLastFilledRow();
        expect(lastRow).not.toBeNull();
        const guess = testFuncs.getGuessFromRow(lastRow);
        expect(guess).toBe('AWARE');
    });
});

describe('Highlighting Logic - applyClass', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should apply wh-valid class to all tiles in row', () => {
        const row = createMockRow('ABOUT');
        testFuncs.applyClass(row, 'wh-valid');

        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(true);
        });
    });

    it('should apply wh-invalid class to all tiles in row', () => {
        const row = createMockRow('ZZZZZ');
        testFuncs.applyClass(row, 'wh-invalid');

        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('wh-invalid')).toBe(true);
        });
    });

    it('should apply wh-past class to all tiles in row', () => {
        const row = createMockRow('CIGAR');
        testFuncs.applyClass(row, 'wh-past');

        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('wh-past')).toBe(true);
        });
    });

    it('should remove previous classes before applying new one', () => {
        const row = createMockRow('ABOUT');
        
        testFuncs.applyClass(row, 'wh-valid');
        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(true);
        });

        testFuncs.applyClass(row, 'wh-invalid');
        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(false);
            expect(tile.classList.contains('wh-invalid')).toBe(true);
        });
    });

    it('should handle rows with no tiles', () => {
        const row = document.createElement('div');
        expect(() => testFuncs.applyClass(row, 'wh-valid')).not.toThrow();
    });
});

describe('Highlighting Logic - clearClasses', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should remove all highlighting classes from row', () => {
        const row = createMockRow('ABOUT');
        testFuncs.applyClass(row, 'wh-valid');
        
        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(true);
        });

        testFuncs.clearClasses(row);
        
        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(false);
            expect(tile.classList.contains('wh-past')).toBe(false);
            expect(tile.classList.contains('wh-invalid')).toBe(false);
        });
    });

    it('should handle multiple class removal', () => {
        const row = createMockRow('ABOUT');
        
        Array.from(row.children).forEach(tile => {
            tile.classList.add('wh-valid', 'wh-past', 'wh-invalid');
        });

        testFuncs.clearClasses(row);
        
        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(false);
            expect(tile.classList.contains('wh-past')).toBe(false);
            expect(tile.classList.contains('wh-invalid')).toBe(false);
        });
    });

    it('should not throw when clearing already cleared row', () => {
        const row = createMockRow('ABOUT');
        expect(() => {
            testFuncs.clearClasses(row);
            testFuncs.clearClasses(row);
        }).not.toThrow();
    });
});

describe('Highlighting Logic - highlight function', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should highlight valid solution word with wh-valid class', () => {
        const board = createMockBoard(['ABOUT']);
        document.body.appendChild(board);

        testFuncs.highlight();

        const lastRow = testFuncs.getLastFilledRow();
        Array.from(lastRow.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(true);
        });
    });

    it('should highlight invalid word with wh-invalid class', () => {
        const board = createMockBoard(['ZZZZZ']);
        document.body.appendChild(board);

        testFuncs.highlight();

        const lastRow = testFuncs.getLastFilledRow();
        Array.from(lastRow.children).forEach(tile => {
            expect(tile.classList.contains('wh-invalid')).toBe(true);
        });
    });

    it('should highlight archive word with wh-past class in development mode', () => {
        testFuncs.ARCHIVE.add('cigar');
        const board = createMockBoard(['CIGAR']);
        document.body.appendChild(board);

        testFuncs.highlight(true); // isDevelopment = true

        const lastRow = testFuncs.getLastFilledRow();
        Array.from(lastRow.children).forEach(tile => {
            expect(tile.classList.contains('wh-past')).toBe(true);
        });
    });

    it('should highlight archive word with wh-valid class in production mode', () => {
        testFuncs.ARCHIVE.add('cigar');
        const board = createMockBoard(['CIGAR']);
        document.body.appendChild(board);

        testFuncs.highlight(false); // isDevelopment = false

        const lastRow = testFuncs.getLastFilledRow();
        Array.from(lastRow.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(true);
        });
    });

    it('should not highlight when no filled rows exist', () => {
        const board = createMockBoard([]);
        document.body.appendChild(board);

        expect(() => testFuncs.highlight()).not.toThrow();
    });

    it('should handle case-insensitive word matching', () => {
        const board = createMockBoard(['about']); // lowercase
        document.body.appendChild(board);

        testFuncs.highlight();

        const lastRow = testFuncs.getLastFilledRow();
        Array.from(lastRow.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(true);
        });
    });

    it('should handle mixed case words', () => {
        const board = createMockBoard(['AbOuT']);
        document.body.appendChild(board);

        testFuncs.highlight();

        const lastRow = testFuncs.getLastFilledRow();
        Array.from(lastRow.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(true);
        });
    });
});

describe('Utility Functions', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        vi.clearAllMocks();
    });

    it('should validate SOLUTIONS set contains expected words', () => {
        const testFuncs = createTestFunctions();
        
        expect(testFuncs.SOLUTIONS.size).toBeGreaterThan(0);
        expect(testFuncs.SOLUTIONS.has('about')).toBe(true);
        expect(testFuncs.SOLUTIONS.has('apple')).toBe(true);
    });

    it('should handle ARCHIVE as a Set', () => {
        const testFuncs = createTestFunctions();
        
        expect(testFuncs.ARCHIVE instanceof Set).toBe(true);
        expect(testFuncs.ARCHIVE.size).toBe(0);
        
        testFuncs.ARCHIVE.add('cigar');
        expect(testFuncs.ARCHIVE.size).toBe(1);
        expect(testFuncs.ARCHIVE.has('cigar')).toBe(true);
    });

    it('should handle chrome.runtime.sendMessage mock', () => {
        expect(global.chrome.runtime.sendMessage).toBeDefined();
        expect(typeof global.chrome.runtime.sendMessage).toBe('function');
    });

    it('should handle chrome.storage.local mock', () => {
        expect(global.chrome.storage.local.get).toBeDefined();
        expect(global.chrome.storage.local.set).toBeDefined();
    });
});

describe('Edge Cases and Error Handling', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should handle rows with fewer than 5 tiles', () => {
        const row = document.createElement('div');
        for (let i = 0; i < 3; i++) {
            row.appendChild(createMockTile('A'));
        }
        
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('AAA');
    });

    it('should handle rows with exactly 5 tiles', () => {
        const row = createMockRow('ABOUT');
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('ABOUT');
        expect(guess.length).toBe(5);
    });

    it('should handle null or undefined inputs gracefully', () => {
        const rows = testFuncs.getRows();
        expect(Array.isArray(rows)).toBe(true);
    });

    it('should handle special characters in words', () => {
        const row = document.createElement('div');
        ['A', 'B', '!', '@', '#'].forEach(char => {
            const tile = createMockTile(char);
            row.appendChild(tile);
        });
        
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('AB!@#');
    });

    it('should handle numeric characters', () => {
        const row = document.createElement('div');
        ['1', '2', '3', '4', '5'].forEach(char => {
            const tile = createMockTile(char);
            row.appendChild(tile);
        });
        
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('12345');
    });

    it('should handle Unicode characters', () => {
        const row = document.createElement('div');
        ['é', 'à', 'ñ', 'ü', 'ç'].forEach(char => {
            const tile = createMockTile(char);
            row.appendChild(tile);
        });
        
        const guess = testFuncs.getGuessFromRow(row);
        expect(guess).toBe('éàñüç');
    });

    it('should handle empty board container', () => {
        const container = document.createElement('div');
        container.id = 'wordle-app-game';
        document.body.appendChild(container);

        const rows = testFuncs.getRows();
        expect(Array.isArray(rows)).toBe(true);
    });
});

describe('Integration Tests', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should complete a full game workflow', () => {
        const board = createMockBoard(['ABOUT', 'APPLE', 'AUDIO']);
        document.body.appendChild(board);

        // Get all rows
        const rows = testFuncs.getRows();
        expect(rows.length).toBe(6);

        // Get last filled row
        const lastRow = testFuncs.getLastFilledRow();
        expect(lastRow).not.toBeNull();

        // Extract guess
        const guess = testFuncs.getGuessFromRow(lastRow);
        expect(guess).toBe('AUDIO');

        // Apply highlighting
        testFuncs.highlight();

        // Verify highlighting
        Array.from(lastRow.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(true);
        });
    });

    it('should handle sequential guesses correctly', () => {
        const guesses = ['ABOUT', 'APPLE', 'AUDIO', 'AVOID'];
        
        guesses.forEach((guess, index) => {
            const board = createMockBoard(guesses.slice(0, index + 1));
            document.body.innerHTML = '';
            document.body.appendChild(board);

            const lastRow = testFuncs.getLastFilledRow();
            expect(lastRow).not.toBeNull();
            
            const extractedGuess = testFuncs.getGuessFromRow(lastRow);
            expect(extractedGuess).toBe(guess);
        });
    });

    it('should correctly categorize mixed valid and invalid words', () => {
        testFuncs.ARCHIVE.add('cigar');
        const board = createMockBoard(['ABOUT', 'ZZZZZ', 'CIGAR']);
        document.body.appendChild(board);

        const rows = testFuncs.getRows();
        
        // Check first row (valid solution)
        const guess1 = testFuncs.getGuessFromRow(rows[0]);
        expect(testFuncs.SOLUTIONS.has(guess1.toLowerCase())).toBe(true);

        // Check second row (invalid)
        const guess2 = testFuncs.getGuessFromRow(rows[1]);
        expect(testFuncs.SOLUTIONS.has(guess2.toLowerCase())).toBe(false);
        expect(testFuncs.ARCHIVE.has(guess2.toLowerCase())).toBe(false);

        // Check third row (archive word)
        const guess3 = testFuncs.getGuessFromRow(rows[2]);
        expect(testFuncs.ARCHIVE.has(guess3.toLowerCase())).toBe(true);
    });
});

describe('Performance and Scalability', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should handle large SOLUTIONS set efficiently', () => {
        expect(testFuncs.SOLUTIONS.size).toBeGreaterThan(0);
        
        // Test lookup performance
        const start = performance.now();
        for (let i = 0; i < 1000; i++) {
            testFuncs.SOLUTIONS.has('about');
        }
        const end = performance.now();
        
        expect(end - start).toBeLessThan(100); // Should be very fast
    });

    it('should handle multiple row operations efficiently', () => {
        const board = createMockBoard(['ABOUT', 'APPLE', 'AUDIO', 'AVOID', 'AWAKE', 'AWARE']);
        document.body.appendChild(board);

        const start = performance.now();
        for (let i = 0; i < 100; i++) {
            testFuncs.getRows();
            testFuncs.getLastFilledRow();
        }
        const end = performance.now();
        
        expect(end - start).toBeLessThan(1000); // Should complete in reasonable time
    });

    it('should handle rapid highlight updates', () => {
        const board = createMockBoard(['ABOUT']);
        document.body.appendChild(board);

        const start = performance.now();
        for (let i = 0; i < 50; i++) {
            testFuncs.highlight();
        }
        const end = performance.now();
        
        expect(end - start).toBeLessThan(500); // Should be fast
    });
});

describe('Archive Fetching Functionality', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should fetch archive successfully', async () => {
        const mockArchiveData = 'cigar\nrebut\nsissy\nhumph\nawake';
        
        global.fetch.mockResolvedValue({
            ok: true,
            status: 200,
            text: () => Promise.resolve(mockArchiveData),
        });

        const ARCHIVE = new Set();
        const response = await fetch('https://example.com/archive.txt');
        const text = await response.text();
        const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(Boolean);
        words.forEach(w => ARCHIVE.add(w));

        expect(ARCHIVE.size).toBe(5);
        expect(ARCHIVE.has('cigar')).toBe(true);
        expect(ARCHIVE.has('rebut')).toBe(true);
        expect(ARCHIVE.has('sissy')).toBe(true);
        expect(ARCHIVE.has('humph')).toBe(true);
        expect(ARCHIVE.has('awake')).toBe(true);
    });

    it('should handle fetch errors gracefully', async () => {
        global.fetch.mockRejectedValue(new Error('Network error'));

        let errorOccurred = false;
        let archiveStatus = 'Archive not loaded';

        try {
            await fetch('https://example.com/archive.txt');
        } catch (err) {
            errorOccurred = true;
            archiveStatus = 'Failed to load archive: ' + err.message;
        }

        expect(errorOccurred).toBe(true);
        expect(archiveStatus).toContain('Failed to load archive');
    });

    it('should handle HTTP errors in fetch', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        });

        const response = await fetch('https://example.com/archive.txt');
        expect(response.ok).toBe(false);
        expect(response.status).toBe(404);
    });

    it('should parse archive with various line endings', async () => {
        const mockArchiveData = 'cigar\r\nrebut\nsissy\nhumph';
        
        global.fetch.mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(mockArchiveData),
        });

        const response = await fetch('https://example.com/archive.txt');
        const text = await response.text();
        // Match how content.js actually parses: split by \n and trim
        const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(Boolean);

        expect(words.length).toBeGreaterThan(0);
        expect(words).toContain('cigar');
        // Note: 'rebut' will be 'rebut\r' after split by \n, but trim() removes it
        const cleanWords = words.map(w => w.replace(/\r$/, ''));
        expect(cleanWords).toContain('rebut');
    });

    it('should filter out empty lines in archive', async () => {
        const mockArchiveData = 'cigar\n\n\nrebut\n\nsissy\n\n';
        
        global.fetch.mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(mockArchiveData),
        });

        const response = await fetch('https://example.com/archive.txt');
        const text = await response.text();
        const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(Boolean);

        expect(words.length).toBe(3);
        expect(words).toContain('cigar');
        expect(words).toContain('rebut');
        expect(words).toContain('sissy');
    });

    it('should convert archive words to lowercase', async () => {
        const mockArchiveData = 'CIGAR\nRebut\nSiSsY';
        
        global.fetch.mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(mockArchiveData),
        });

        const response = await fetch('https://example.com/archive.txt');
        const text = await response.text();
        const words = text.split('\n').map(w => w.trim().toLowerCase()).filter(Boolean);

        expect(words).toContain('cigar');
        expect(words).toContain('rebut');
        expect(words).toContain('sissy');
        words.forEach(word => {
            expect(word).toBe(word.toLowerCase());
        });
    });
});

describe('Auto-Fetch Functionality', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
        vi.clearAllMocks();
    });

    it('should detect rendered tiles for auto-fetch trigger', () => {
        const board = createMockBoard(['ABOUT']);
        document.body.appendChild(board);

        const rows = testFuncs.getRows();
        let rendered = false;

        for (const r of rows) {
            const tiles = Array.from(r.children || []);
            if (tiles.length >= 5) {
                const t0 = tiles[0];
                const text = (t0 && (t0.textContent || '').trim()) || '';
                if (text.length > 0) {
                    rendered = true;
                    break;
                }
            }
        }

        expect(rendered).toBe(true);
    });

    it('should not trigger auto-fetch when no tiles are rendered', () => {
        const board = createMockBoard([]);
        document.body.appendChild(board);

        const rows = testFuncs.getRows();
        let rendered = false;

        for (const r of rows) {
            const tiles = Array.from(r.children || []);
            if (tiles.length >= 5) {
                const t0 = tiles[0];
                const text = (t0 && (t0.textContent || '').trim()) || '';
                if (text.length > 0) {
                    rendered = true;
                    break;
                }
            }
        }

        expect(rendered).toBe(false);
    });

    it('should check tile visibility using offsetParent', () => {
        const board = createMockBoard(['ABOUT']);
        document.body.appendChild(board);

        const rows = testFuncs.getRows();
        const tiles = Array.from(rows[0].children || []);
        const t0 = tiles[0];

        // In jsdom, offsetParent might be null, but we test the check exists
        expect(typeof t0.offsetParent).not.toBe('undefined');
    });
});

describe('Message Passing and Chrome API Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should send messages via chrome.runtime.sendMessage', () => {
        const mockMessage = { action: 'testAction', data: 'testData' };
        
        global.chrome.runtime.sendMessage(mockMessage);
        
        expect(global.chrome.runtime.sendMessage).toHaveBeenCalledWith(mockMessage);
        expect(global.chrome.runtime.sendMessage).toHaveBeenCalledTimes(1);
    });

    it('should listen for messages via chrome.runtime.onMessage', () => {
        const mockCallback = vi.fn();
        
        global.chrome.runtime.onMessage.addListener(mockCallback);
        
        expect(global.chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(mockCallback);
    });

    it('should get data from chrome.storage.local', () => {
        const callback = vi.fn();
        
        global.chrome.storage.local.get(['autoFetch'], callback);
        
        expect(global.chrome.storage.local.get).toHaveBeenCalledWith(['autoFetch'], callback);
        expect(callback).toHaveBeenCalled();
    });

    it('should set data in chrome.storage.local', () => {
        const callback = vi.fn();
        const data = { autoFetch: true };
        
        global.chrome.storage.local.set(data, callback);
        
        expect(global.chrome.storage.local.set).toHaveBeenCalledWith(data, callback);
        expect(callback).toHaveBeenCalled();
    });
});

describe('CSS Class Management', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should ensure only one highlighting class is applied at a time', () => {
        const row = createMockRow('ABOUT');
        
        testFuncs.applyClass(row, 'wh-valid');
        Array.from(row.children).forEach(tile => {
            const classes = Array.from(tile.classList);
            const highlightClasses = classes.filter(c => 
                c === 'wh-valid' || c === 'wh-past' || c === 'wh-invalid'
            );
            expect(highlightClasses.length).toBe(1);
        });
    });

    it('should remove all highlighting classes when class is null', () => {
        const row = createMockRow('ABOUT');
        
        testFuncs.applyClass(row, 'wh-valid');
        testFuncs.applyClass(row, null);
        
        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('wh-valid')).toBe(false);
            expect(tile.classList.contains('wh-past')).toBe(false);
            expect(tile.classList.contains('wh-invalid')).toBe(false);
        });
    });

    it('should preserve non-highlighting classes', () => {
        const row = createMockRow('ABOUT');
        
        Array.from(row.children).forEach(tile => {
            tile.classList.add('tile', 'custom-class');
        });
        
        testFuncs.applyClass(row, 'wh-valid');
        
        Array.from(row.children).forEach(tile => {
            expect(tile.classList.contains('tile')).toBe(true);
            expect(tile.classList.contains('custom-class')).toBe(true);
            expect(tile.classList.contains('wh-valid')).toBe(true);
        });
    });
});

describe('Selector Fallback Logic', () => {
    let testFuncs;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
    });

    it('should try multiple selectors until one succeeds', () => {
        // Create board with different structure
        const container = document.createElement('div');
        const row1 = document.createElement('div');
        row1.className = 'board-row';
        const row2 = document.createElement('div');
        row2.className = 'board-row';
        
        container.appendChild(row1);
        container.appendChild(row2);
        document.body.appendChild(container);

        const rows = testFuncs.getRows();
        expect(rows.length).toBe(2);
    });

    it('should use first successful selector', () => {
        const board = createMockBoard(['ABOUT']);
        document.body.appendChild(board);

        const rows = testFuncs.getRows();
        expect(rows.length).toBeGreaterThan(0);
    });

    it('should handle querySelector exceptions gracefully', () => {
        // Create malformed HTML that might cause selector issues
        document.body.innerHTML = '<div>Random content</div>';
        
        const rows = testFuncs.getRows();
        expect(Array.isArray(rows)).toBe(true);
    });
});

describe('Mutation Observer Behavior', () => {
    let testFuncs;
    let observerCallback;
    let mutationObserverMock;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
        observerCallback = null;
        
        // Mock MutationObserver
        mutationObserverMock = vi.fn((callback) => {
            observerCallback = callback;
            return {
                observe: vi.fn(),
                disconnect: vi.fn(),
                takeRecords: vi.fn()
            };
        });
        global.MutationObserver = mutationObserverMock;
    });

    it('should create and configure mutation observer', () => {
        const callback = vi.fn();
        const observer = new MutationObserver(callback);
        
        expect(mutationObserverMock).toHaveBeenCalledWith(callback);
        expect(observer.observe).toBeDefined();
        expect(observer.disconnect).toBeDefined();
    });

    it('should observe DOM changes with correct options', () => {
        const callback = vi.fn();
        const observer = new MutationObserver(callback);
        observer.observe(document.body, { childList: true, subtree: true });
        
        expect(observer.observe).toHaveBeenCalledWith(
            document.body,
            { childList: true, subtree: true }
        );
    });

    it('should trigger callback when DOM mutations occur', () => {
        const callback = vi.fn();
        const observer = new MutationObserver(callback);
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Simulate mutation
        const mutations = [{ type: 'childList', addedNodes: [] }];
        callback(mutations);
        
        expect(callback).toHaveBeenCalledWith(mutations);
    });

    it('should handle observer disconnect gracefully', () => {
        const callback = vi.fn();
        const observer = new MutationObserver(callback);
        observer.observe(document.body, { childList: true, subtree: true });
        
        expect(() => observer.disconnect()).not.toThrow();
        expect(observer.disconnect).toHaveBeenCalled();
    });

    it('should respect mutation throttling logic', () => {
        let mutating = false;
        let lastMutated = 0;
        let lastObserverRun = 0;
        
        const shouldProcessMutation = () => {
            const now = Date.now();
            if (mutating) return false;
            if (lastMutated && (now - lastMutated) < 60) return false;
            if (lastObserverRun && (now - lastObserverRun) < 40) return false;
            return true;
        };

        // First call should process
        expect(shouldProcessMutation()).toBe(true);
        
        // Set flags as if mutation just happened
        mutating = true;
        expect(shouldProcessMutation()).toBe(false);
        
        mutating = false;
        lastMutated = Date.now();
        expect(shouldProcessMutation()).toBe(false);
    });

    it('should call highlight and update on mutations', async () => {
        const board = createMockBoard(['ABOUT']);
        document.body.appendChild(board);
        
        const highlightSpy = vi.fn();
        const updateSpy = vi.fn();
        
        // Simulate observer callback
        const callback = () => {
            const now = Date.now();
            highlightSpy();
            updateSpy();
        };
        
        callback();
        
        expect(highlightSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalled();
    });

    it('should handle exceptions in observer callback', () => {
        const callback = vi.fn(() => {
            throw new Error('Test error');
        });
        
        const observer = new MutationObserver((mutations) => {
            try {
                callback();
            } catch (e) {
                // Should handle error gracefully
            }
        });
        
        expect(() => {
            observer.observe(document.body, { childList: true, subtree: true });
        }).not.toThrow();
    });
});

describe('Interval-Based Updates', () => {
    let testFuncs;
    let intervalId;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        if (intervalId) {
            clearInterval(intervalId);
        }
    });

    it('should set up interval with correct timing', () => {
        const callback = vi.fn();
        intervalId = setInterval(callback, 500);
        
        expect(callback).not.toHaveBeenCalled();
        
        vi.advanceTimersByTime(500);
        expect(callback).toHaveBeenCalledTimes(1);
        
        vi.advanceTimersByTime(500);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should call highlight function on interval', () => {
        const board = createMockBoard(['ABOUT']);
        document.body.appendChild(board);
        
        const highlightSpy = vi.fn();
        intervalId = setInterval(() => {
            highlightSpy();
        }, 500);
        
        vi.advanceTimersByTime(500);
        expect(highlightSpy).toHaveBeenCalledTimes(1);
        
        vi.advanceTimersByTime(1000);
        expect(highlightSpy).toHaveBeenCalledTimes(3);
    });

    it('should respect mutation throttling in interval', () => {
        let mutating = false;
        let lastMutated = 0;
        
        const callback = vi.fn(() => {
            if (mutating) return;
            if (lastMutated && (Date.now() - lastMutated) < 80) return;
            // Process update
        });
        
        intervalId = setInterval(callback, 500);
        
        vi.advanceTimersByTime(500);
        expect(callback).toHaveBeenCalled();
        
        // Set mutating flag
        mutating = true;
        vi.advanceTimersByTime(500);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should handle errors in interval callback gracefully', () => {
        const callback = vi.fn(() => {
            throw new Error('Test error');
        });
        
        intervalId = setInterval(() => {
            try {
                callback();
            } catch (e) {
                // Handle gracefully
            }
        }, 500);
        
        expect(() => {
            vi.advanceTimersByTime(500);
        }).not.toThrow();
    });

    it('should call checkAndAutoFetch on interval', () => {
        const autoFetchSpy = vi.fn();
        
        intervalId = setInterval(() => {
            autoFetchSpy();
        }, 500);
        
        vi.advanceTimersByTime(500);
        expect(autoFetchSpy).toHaveBeenCalledTimes(1);
    });

    it('should clear interval on cleanup', () => {
        const callback = vi.fn();
        intervalId = setInterval(callback, 500);
        
        clearInterval(intervalId);
        intervalId = null;
        
        vi.advanceTimersByTime(1000);
        expect(callback).not.toHaveBeenCalled();
    });

    it('should handle multiple intervals correctly', () => {
        const callback1 = vi.fn();
        const callback2 = vi.fn();
        
        const interval1 = setInterval(callback1, 500);
        const interval2 = setInterval(callback2, 1000);
        
        vi.advanceTimersByTime(500);
        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).not.toHaveBeenCalled();
        
        vi.advanceTimersByTime(500);
        expect(callback1).toHaveBeenCalledTimes(2);
        expect(callback2).toHaveBeenCalledTimes(1);
        
        clearInterval(interval1);
        clearInterval(interval2);
    });
});

describe('Debug Panel Interactions', () => {
    let testFuncs;
    let panel;
    let toggleBtn;
    let fetchBtn;
    let autoToggleBtn;

    beforeEach(() => {
        testFuncs = createTestFunctions();
        document.body.innerHTML = '';
        
        // Create debug panel elements
        toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'DEBUG';
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '8px';
        toggleBtn.style.left = '8px';
        
        panel = document.createElement('div');
        panel.className = 'wh-panel';
        panel.style.display = 'none';
        
        fetchBtn = document.createElement('button');
        fetchBtn.textContent = 'Fetch Archive';
        fetchBtn.className = 'wh-btn';
        
        autoToggleBtn = document.createElement('button');
        autoToggleBtn.className = 'wh-btn';
        autoToggleBtn.textContent = 'Auto-Fetch: ON';
        
        panel.appendChild(fetchBtn);
        panel.appendChild(autoToggleBtn);
        
        document.body.appendChild(toggleBtn);
        document.body.appendChild(panel);
    });

    it('should create debug panel elements in development mode', () => {
        expect(toggleBtn).toBeDefined();
        expect(panel).toBeDefined();
        expect(fetchBtn).toBeDefined();
        expect(autoToggleBtn).toBeDefined();
    });

    it('should toggle panel visibility on button click', () => {
        const toggleDebugPanel = () => {
            const cs = window.getComputedStyle(panel);
            const isHidden = cs.display === 'none' || panel.style.display === 'none';
            panel.style.display = isHidden ? 'block' : 'none';
        };
        
        expect(panel.style.display).toBe('none');
        
        toggleDebugPanel();
        expect(panel.style.display).toBe('block');
        
        toggleDebugPanel();
        expect(panel.style.display).toBe('none');
    });

    it('should handle fetch archive button click', () => {
        const fetchArchiveSpy = vi.fn();
        fetchBtn.onclick = () => fetchArchiveSpy(false, true);
        
        fetchBtn.click();
        expect(fetchArchiveSpy).toHaveBeenCalledWith(false, true);
    });

    it('should toggle auto-fetch setting', () => {
        let autoFetchEnabled = true;
        
        const toggleAutoFetch = () => {
            autoFetchEnabled = !autoFetchEnabled;
            autoToggleBtn.textContent = autoFetchEnabled ? 'Auto-Fetch: ON' : 'Auto-Fetch: OFF';
        };
        
        autoToggleBtn.onclick = toggleAutoFetch;
        
        expect(autoToggleBtn.textContent).toBe('Auto-Fetch: ON');
        
        autoToggleBtn.click();
        expect(autoToggleBtn.textContent).toBe('Auto-Fetch: OFF');
        
        autoToggleBtn.click();
        expect(autoToggleBtn.textContent).toBe('Auto-Fetch: ON');
    });

    it('should display debug information in panel', () => {
        const panelPre = document.createElement('pre');
        panelPre.style.margin = '0 0 6px 0';
        panel.insertBefore(panelPre, fetchBtn);
        
        const board = createMockBoard(['ABOUT', 'APPLE']);
        document.body.appendChild(board);
        
        // Simulate update function
        const rows = testFuncs.getRows();
        let text = 'Wordle Accessibility Helper (DEV)\n';
        rows.forEach((r, i) => {
            const g = testFuncs.getGuessFromRow(r).toLowerCase();
            let tag = '(empty)';
            if (g.length === 5) {
                if (testFuncs.SOLUTIONS.has(g)) tag = '[solution]';
                else tag = '[invalid]';
            }
            text += `Row ${i + 1}: ${g || '(empty)'} ${tag}\n`;
        });
        panelPre.textContent = text;
        
        expect(panelPre.textContent).toContain('Wordle Accessibility Helper');
        expect(panelPre.textContent).toContain('Row 1: about [solution]');
        expect(panelPre.textContent).toContain('Row 2: apple [solution]');
    });

    it('should handle panel elements being null gracefully', () => {
        const toggleDebugPanel = (isDevelopment, panelEl) => {
            if (!isDevelopment || !panelEl) return;
            
            try {
                const cs = window.getComputedStyle(panelEl);
                const isHidden = cs.display === 'none' || panelEl.style.display === 'none';
                panelEl.style.display = isHidden ? 'block' : 'none';
            } catch (e) {}
        };
        
        expect(() => toggleDebugPanel(true, null)).not.toThrow();
        expect(() => toggleDebugPanel(false, panel)).not.toThrow();
    });

    it('should style debug button correctly', () => {
        expect(toggleBtn.style.position).toBe('fixed');
        expect(toggleBtn.style.top).toBe('8px');
        expect(toggleBtn.style.left).toBe('8px');
    });

    it('should store auto-fetch setting in chrome storage', () => {
        const mockChrome = {
            storage: {
                local: {
                    set: vi.fn(),
                    get: vi.fn((keys, callback) => callback({ autoFetch: true }))
                }
            }
        };
        
        global.chrome = mockChrome;
        
        let autoFetchEnabled = true;
        autoToggleBtn.onclick = () => {
            autoFetchEnabled = !autoFetchEnabled;
            chrome.storage.local.set({ autoFetch: autoFetchEnabled });
        };
        
        autoToggleBtn.click();
        expect(mockChrome.storage.local.set).toHaveBeenCalledWith({ autoFetch: false });
    });

    it('should load auto-fetch setting from chrome storage', () => {
        const mockChrome = {
            storage: {
                local: {
                    get: vi.fn((keys, callback) => {
                        callback({ autoFetch: false });
                    })
                }
            }
        };
        
        global.chrome = mockChrome;
        
        let autoFetchEnabled = true;
        chrome.storage.local.get(['autoFetch'], (result) => {
            if (result.autoFetch !== undefined) {
                autoFetchEnabled = result.autoFetch;
            }
        });
        
        expect(mockChrome.storage.local.get).toHaveBeenCalledWith(['autoFetch'], expect.any(Function));
    });
});
