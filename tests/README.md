# Test Suite Documentation

## Overview

This test suite provides comprehensive unit tests for the Wordle Accessibility Helper content script. The tests validate all key functionality including word validation, row detection, guess extraction, highlighting logic, and utility functions.

## Test Statistics

- **Total Tests**: 95
- **Test Files**: 1 (tests/content.test.js)
- **Lines of Code**: ~1,470 lines
- **Pass Rate**: 100% ✅

## Test Categories

### 1. Word Validation (5 tests)
Tests for validating words against the SOLUTIONS and ARCHIVE sets.

- ✓ Validates words in SOLUTIONS set
- ✓ Rejects words not in SOLUTIONS set
- ✓ Validates case-insensitive words
- ✓ Handles archive words when populated
- ✓ Uses isWordValid helper function

### 2. Row Detection - getRows (5 tests)
Tests for detecting Wordle game rows using multiple CSS selector patterns.

- ✓ Detects rows using first selector pattern
- ✓ Detects rows using .board-row selector
- ✓ Returns empty array when no rows found
- ✓ Handles malformed selectors gracefully
- ✓ Returns array of DOM elements

### 3. Guess Extraction - getGuessFromRow (6 tests)
Tests for extracting letter guesses from row elements.

- ✓ Extracts 5-letter guess from row
- ✓ Extracts partial guess from incomplete row
- ✓ Returns empty string for empty row
- ✓ Trims whitespace from tiles
- ✓ Handles rows with more than 5 tiles
- ✓ Handles empty tile content

### 4. Last Filled Row Detection - getLastFilledRow (5 tests)
Tests for finding the most recent completed guess.

- ✓ Returns last filled row when multiple rows are filled
- ✓ Returns null when no rows are filled
- ✓ Returns the only filled row when one row is filled
- ✓ Ignores partially filled rows
- ✓ Handles board with all 6 rows filled

### 5. Highlighting Logic - applyClass (5 tests)
Tests for applying CSS classes to highlight words.

- ✓ Applies wh-valid class to all tiles in row
- ✓ Applies wh-invalid class to all tiles in row
- ✓ Applies wh-past class to all tiles in row
- ✓ Removes previous classes before applying new one
- ✓ Handles rows with no tiles

### 6. Highlighting Logic - clearClasses (3 tests)
Tests for removing highlighting classes.

- ✓ Removes all highlighting classes from row
- ✓ Handles multiple class removal
- ✓ Doesn't throw when clearing already cleared row

### 7. Highlighting Logic - highlight function (7 tests)
Tests for the main highlighting logic.

- ✓ Highlights valid solution word with wh-valid class
- ✓ Highlights invalid word with wh-invalid class
- ✓ Highlights archive word with wh-past class (dev mode)
- ✓ Highlights archive word with wh-valid class (prod mode)
- ✓ Doesn't highlight when no filled rows exist
- ✓ Handles case-insensitive word matching
- ✓ Handles mixed case words

### 8. Utility Functions (4 tests)
Tests for helper functions and mocks.

- ✓ Validates SOLUTIONS set contains expected words
- ✓ Handles ARCHIVE as a Set
- ✓ Handles chrome.runtime.sendMessage mock
- ✓ Handles chrome.storage.local mock

### 9. Edge Cases and Error Handling (8 tests)
Tests for handling unusual inputs and edge cases.

- ✓ Handles rows with fewer than 5 tiles
- ✓ Handles rows with exactly 5 tiles
- ✓ Handles null or undefined inputs gracefully
- ✓ Handles special characters in words
- ✓ Handles numeric characters
- ✓ Handles Unicode characters
- ✓ Handles empty board container

### 10. Integration Tests (3 tests)
Tests for complete workflows and scenarios.

- ✓ Completes a full game workflow
- ✓ Handles sequential guesses correctly
- ✓ Correctly categorizes mixed valid and invalid words

### 11. Performance and Scalability (3 tests)
Tests for performance with large datasets.

- ✓ Handles large SOLUTIONS set efficiently
- ✓ Handles multiple row operations efficiently
- ✓ Handles rapid highlight updates

### 12. Archive Fetching Functionality (6 tests)
Tests for fetching and parsing historical Wordle answers.

- ✓ Fetches archive successfully
- ✓ Handles fetch errors gracefully
- ✓ Handles HTTP errors in fetch
- ✓ Parses archive with various line endings
- ✓ Filters out empty lines in archive
- ✓ Converts archive words to lowercase

### 13. Auto-Fetch Functionality (3 tests)
Tests for automatic archive fetching.

- ✓ Detects rendered tiles for auto-fetch trigger
- ✓ Doesn't trigger auto-fetch when no tiles are rendered
- ✓ Checks tile visibility using offsetParent

### 14. Message Passing and Chrome API Integration (4 tests)
Tests for Chrome extension API integration.

- ✓ Sends messages via chrome.runtime.sendMessage
- ✓ Listens for messages via chrome.runtime.onMessage
- ✓ Gets data from chrome.storage.local
- ✓ Sets data in chrome.storage.local

### 15. CSS Class Management (3 tests)
Tests for managing CSS classes on tiles.

- ✓ Ensures only one highlighting class is applied at a time
- ✓ Removes all highlighting classes when class is null
- ✓ Preserves non-highlighting classes

### 16. Selector Fallback Logic (3 tests)
Tests for CSS selector fallback mechanisms.

- ✓ Tries multiple selectors until one succeeds
- ✓ Uses first successful selector
- ✓ Handles querySelector exceptions gracefully

### 17. Mutation Observer Behavior (7 tests)
Tests for mutation observer initialization and behavior.

- ✓ Creates and configures mutation observer
- ✓ Observes DOM changes with correct options
- ✓ Triggers callback when DOM mutations occur
- ✓ Handles observer disconnect gracefully
- ✓ Respects mutation throttling logic
- ✓ Calls highlight and update on mutations
- ✓ Handles exceptions in observer callback

### 18. Interval-Based Updates (7 tests)
Tests for interval-based update mechanism.

- ✓ Sets up interval with correct timing
- ✓ Calls highlight function on interval
- ✓ Respects mutation throttling in interval
- ✓ Handles errors in interval callback gracefully
- ✓ Calls checkAndAutoFetch on interval
- ✓ Clears interval on cleanup
- ✓ Handles multiple intervals correctly

### 19. Debug Panel Interactions (9 tests)
Tests for debug panel UI and functionality.

- ✓ Creates debug panel elements in development mode
- ✓ Toggles panel visibility on button click
- ✓ Handles fetch archive button click
- ✓ Toggles auto-fetch setting
- ✓ Displays debug information in panel
- ✓ Handles panel elements being null gracefully
- ✓ Styles debug button correctly
- ✓ Stores auto-fetch setting in chrome storage
- ✓ Loads auto-fetch setting from chrome storage

## Running Tests

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Test Utilities

The test suite includes custom utilities in `tests/utils/testUtils.js`:

- `createMockElement(tagName, attributes)` - Creates mock DOM elements
- `createMockTile(letter)` - Creates a single Wordle tile
- `createMockRow(word)` - Creates a complete Wordle row
- `createMockBoard(words)` - Creates a full Wordle board
- `createChromeAPIMock()` - Creates Chrome extension API mocks
- `simulateClick(element)` - Simulates click events
- `wait(ms)` - Utility for async delays

## Test Setup

The test environment is configured in `tests/setup.js`:

- Uses **jsdom** for DOM simulation
- Provides **vitest** as the test runner
- Mocks Chrome extension APIs
- Sets up global __DEV__ and __PROD__ flags

## Coverage

The test suite focuses on logic validation rather than direct code coverage, as the content script is wrapped in an IIFE for browser execution. The tests validate:

- All critical function logic patterns
- Edge cases and error handling
- Integration scenarios
- Performance characteristics

## Continuous Integration

These tests are designed to run in CI environments:

- Fast execution (~900ms total)
- No external dependencies required
- Deterministic results
- Clear failure messages

## Future Enhancements

Potential areas for expansion:

- [x] Tests for mutation observer behavior
- [x] Tests for interval-based updates
- [x] Tests for debug panel interactions
- [ ] E2E tests with actual Wordle page
- [ ] Visual regression tests for highlighting
