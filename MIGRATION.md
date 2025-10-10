# Migration Guide

This guide helps you migrate from the legacy vanilla JavaScript presentation system to the new React-based Preso framework.

## Overview

The legacy system (`presentation/`) uses:
- Vanilla JavaScript with global state
- HTML templates with inline styles
- Direct DOM manipulation
- `slides-data.js` for content
- `presentation-utils.js` for logic

The new system uses:
- React components with hooks
- TypeScript for type safety
- Declarative rendering
- Modular architecture with packages

## Migration Steps

### 1. Understand Current Structure

**Legacy Files:**
```
presentation/
├── slides-data.js          # Slide content definitions
├── presentation-utils.js   # Rendering & navigation logic
├── presentation-styles.css # Global styles
├── presentation.html       # Full version
└── presentation-7min.html  # Short version
```

**Key Concepts:**
- `allSlides` object: Contains all slide definitions
- `presentationConfigs`: Defines different presentation versions
- `renderSlide()`: Renders slides via DOM manipulation
- Global state variables (`currentSlideIndex`, `isPresentationStarted`)

### 2. Extract Slide Data

Convert `allSlides` object to `DeckSpec` format.

**Before (slides-data.js):**
```javascript
const allSlides = {
  "plan": {
    id: "plan",
    tracker: "RULES",
    title: "The Rules",
    content: `
      <div class="mt-8">
        <ol class="list-decimal">
          <li>Rule 1</li>
          <li>Rule 2</li>
        </ol>
      </div>
    `,
    notes: [
      "First note",
      "Second note"
    ],
    snark: [
      "// Snarky comment 1",
      "// Snarky comment 2"
    ]
  }
};
```

**After (DeckSpec):**
```typescript
import type { DeckSpec } from '@preso/core';

const deck: DeckSpec = {
  title: 'Couch Coding',
  author: 'Gordon Keenan',
  date: '2025',
  theme: {
    colors: {
      primary: '#6aaa64',
      secondary: '#c9b458',
      background: '#121212',
      text: '#ffffff',
    },
  },
  slides: [
    {
      id: 'plan',
      title: 'The Rules',
      blocks: [
        {
          type: 'html',
          content: `
            <div class="mt-8">
              <ol class="list-decimal">
                <li>Rule 1</li>
                <li>Rule 2</li>
              </ol>
            </div>
          `,
        },
      ],
      meta: {
        tracker: 'RULES',
        notes: [
          'First note',
          'Second note',
        ],
        snark: [
          '// Snarky comment 1',
          '// Snarky comment 2',
        ],
      },
    },
  ],
};
```

### 3. Convert Rendering Logic

**Before (presentation-utils.js):**
```javascript
function renderSlide(index) {
  const slide = slides[index];
  const contentDiv = document.getElementById('slide-content');
  
  contentDiv.innerHTML = `
    <div class="flex flex-col items-center">
      <h2 class="text-4xl">${slide.title}</h2>
      <div>${renderTracker(slide.tracker, index)}</div>
      <div>${slide.content}</div>
    </div>
  `;
}
```

**After (React Template):**
```typescript
import type { Template } from '@preso/core';

const defaultTemplate: Template = {
  name: 'default',
  render: (slide, theme) => {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-4xl">{slide.title}</h2>
        {slide.meta?.tracker && (
          <div>
            <Tracker word={slide.meta.tracker} />
          </div>
        )}
        <div>
          {slide.blocks?.map((block, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: block.content }} />
          ))}
        </div>
      </div>
    );
  },
};
```

### 4. Port Special Features

#### Tracker Component

**Before:**
```javascript
function renderTracker(word, slideIndex) {
  return word.split('').map((letter, i) => {
    const color = getTileColor();
    return `<div class="tracker-tile ${color}">${letter}</div>`;
  }).join('');
}
```

**After:**
```typescript
interface TrackerProps {
  word: string;
}

function Tracker({ word }: TrackerProps) {
  return (
    <div className="tracker-display">
      {word.split('').map((letter, i) => {
        const color = getTileColor();
        return (
          <div key={i} className={`tracker-tile ${color}`}>
            {letter}
          </div>
        );
      })}
    </div>
  );
}
```

#### Snark Overlay

**Before:**
```javascript
function showSnarkOverlay(snarkText, isLarge = false) {
  const overlay = document.getElementById('snark-overlay');
  overlay.classList.add('active');
  // Typing animation logic...
}
```

**After:**
```typescript
import { SnarkTerminalBox } from '@preso/modules';

// In template:
{slide.meta?.snark && (
  <SnarkTerminalBox 
    messages={slide.meta.snark}
    large={slide.meta.snarkLarge}
  />
)}
```

#### Navigation

**Before:**
```javascript
let currentSlideIndex = 0;

function navigateSlide(direction) {
  const newIndex = currentSlideIndex + direction;
  if (newIndex >= 0 && newIndex < slides.length) {
    renderSlide(newIndex);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') navigateSlide(1);
  if (event.key === 'ArrowLeft') navigateSlide(-1);
});
```

**After:**
```typescript
function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' && currentSlide < deck.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <PresoRoot deck={compiledDeck} currentSlide={currentSlide} />
    </div>
  );
}
```

### 5. Migrate Styles

**Before (presentation-styles.css):**
```css
.tracker-tile {
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wordle-green { background-color: #6aaa64; }
.wordle-yellow { background-color: #c9b458; }
```

**After (Component styles):**
```css
/* Import base styles */
@import '@preso/react/styles.css';

/* Custom component styles */
.tracker-tile {
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wordle-green { 
  background-color: var(--preso-color-primary, #6aaa64); 
}

.wordle-yellow { 
  background-color: var(--preso-color-secondary, #c9b458); 
}
```

### 6. Handle Multiple Versions

**Before:**
```javascript
const presentationConfigs = {
  "7min": ["plan", "couch-coding", "core-problem", ...],
  "full": ["plan", "couch-coding", "core-problem", ...],
};

const slides = getSlides('7min');
```

**After:**
```typescript
const fullDeck: DeckSpec = {
  title: 'Couch Coding - Full',
  slides: [/* all slides */],
};

const shortDeck: DeckSpec = {
  title: 'Couch Coding - 7 Min',
  slides: fullDeck.slides.filter(s => 
    ['plan', 'couch-coding', 'core-problem'].includes(s.id)
  ),
};
```

## Step-by-Step Example

### Converting a Complete Slide

**Before:**
```javascript
const allSlides = {
  "demo-video": {
    id: "demo-video",
    tracker: "DEMO",
    title: "Demo: Extension in Action",
    content: `
      <div class="flex flex-col items-center">
        <video controls class="w-full rounded-lg">
          <source src="demo.mov" type="video/mp4">
        </video>
        <p class="mt-4 text-gray-400">Watch the demo</p>
      </div>
    `,
    snark: [
      '// What a wonderful demo',
      '// I could not have done it better myself...'
    ],
    notes: [
      "Show the demo video",
      "Explain the features being demonstrated"
    ]
  }
};
```

**After:**
```typescript
const slides: Slide[] = [
  {
    id: 'demo-video',
    title: 'Demo: Extension in Action',
    template: 'default',
    blocks: [
      {
        type: 'html',
        content: `
          <div class="flex flex-col items-center">
            <video controls class="w-full rounded-lg">
              <source src="demo.mov" type="video/mp4">
            </video>
            <p class="mt-4 text-gray-400">Watch the demo</p>
          </div>
        `,
      },
    ],
    meta: {
      tracker: 'DEMO',
      snark: [
        '// What a wonderful demo',
        '// I could not have done it better myself...',
      ],
      notes: [
        'Show the demo video',
        'Explain the features being demonstrated',
      ],
    },
  },
];
```

## Testing After Migration

### 1. Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { SlideCompiler, TemplateRegistry } from '@preso/core';

describe('Migrated Deck', () => {
  it('should compile successfully', () => {
    const registry = new TemplateRegistry();
    const compiler = new SlideCompiler(registry);
    
    const compiled = compiler.compile(migratedDeck);
    expect(compiled.slides.length).toBe(expectedSlideCount);
  });

  it('should have all required slides', () => {
    const slideIds = migratedDeck.slides.map(s => s.id);
    const requiredIds = ['plan', 'couch-coding', 'demo-video'];
    
    requiredIds.forEach(id => {
      expect(slideIds).toContain(id);
    });
  });
});
```

### 2. Visual Testing

Create a test app to verify rendering:

```typescript
function TestApp() {
  return (
    <div>
      {compiledDeck.slides.map((slide, i) => (
        <div key={i} style={{ marginBottom: '2rem' }}>
          <h3>Slide {i + 1}: {slide.slide.id}</h3>
          <PresoRoot deck={compiledDeck} currentSlide={i} />
        </div>
      ))}
    </div>
  );
}
```

## Common Issues and Solutions

### Issue 1: Missing Types

**Problem:** TypeScript errors about missing types

**Solution:**
```typescript
import type { DeckSpec, Slide, SlideBlock } from '@preso/core';
```

### Issue 2: HTML Content Not Rendering

**Problem:** HTML content appears as text

**Solution:** Use `dangerouslySetInnerHTML`:
```typescript
<div dangerouslySetInnerHTML={{ __html: block.content }} />
```

### Issue 3: Styles Not Applying

**Problem:** CSS classes don't work

**Solution:** Import stylesheets:
```typescript
import '@preso/react/styles.css';
import '@preso/modules/styles.css';
import './custom-styles.css';
```

### Issue 4: State Management

**Problem:** Global state conflicts

**Solution:** Use React state and context:
```typescript
const [currentSlide, setCurrentSlide] = useState(0);
```

## Incremental Migration

You can migrate gradually:

1. **Phase 1**: Set up new packages alongside legacy code
2. **Phase 2**: Migrate one presentation version
3. **Phase 3**: Port custom features (tracker, snark)
4. **Phase 4**: Migrate remaining versions
5. **Phase 5**: Remove legacy code

## Backward Compatibility

Keep legacy code working during migration:

```typescript
// New route
if (window.location.hash === '#new') {
  renderReactApp();
} else {
  // Legacy code
  initializePresentation();
}
```

## Deployment

### Before

```html
<!-- presentation.html -->
<script src="slides-data.js"></script>
<script src="presentation-utils.js"></script>
```

### After

```typescript
// Build and deploy
npm run build

// Outputs to dist/
// Deploy dist/ to your hosting
```

## Resources

- [README-PRESO.md](./README-PRESO.md) - Framework overview
- [TEMPLATES.md](./TEMPLATES.md) - Template guide
- [MODULES.md](./MODULES.md) - Module guide
- [DSL.md](./DSL.md) - DSL reference
- [apps/demo](./apps/demo) - Working example

## Need Help?

If you encounter issues during migration:

1. Check the demo app for examples
2. Review the test files for patterns
3. Consult the type definitions
4. Look at existing templates

## Migration Checklist

- [ ] Extract slide data to DeckSpec format
- [ ] Create templates for custom layouts
- [ ] Port special components (Tracker, Snark, etc.)
- [ ] Migrate navigation logic
- [ ] Convert styles to CSS modules/variables
- [ ] Add TypeScript types
- [ ] Write tests
- [ ] Update build configuration
- [ ] Deploy new version
- [ ] Remove legacy code
