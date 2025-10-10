# Migration Guide

## Overview

This guide explains how to migrate the existing HTML/JavaScript presentation to the new Preso system.

## Before and After

### Before (Old System)

The old system used:
- Static HTML files (`presentation.html`, `presentation-7min.html`)
- Shared JavaScript (`presentation-utils.js`, `slides-data.js`)
- Tailwind CSS via CDN
- Manual slide management with DOM manipulation

### After (New System)

The new system uses:
- React components with TypeScript
- Declarative DeckSpec format (JSON)
- Theme system with CSS variables
- Component-based architecture
- Build-time compilation

## Migration Steps

### 1. Extract Slide Data to DeckSpec

Convert slides from JavaScript objects to JSON format:

**Old format (slides-data.js):**
```javascript
const allSlides = {
  "intro": {
    id: "intro",
    title: "Welcome",
    content: `<div>Hello World</div>`,
    notes: ["Speaker note"]
  }
};
```

**New format (deck.json):**
```json
{
  "version": "1.0.0",
  "metadata": {
    "title": "My Presentation"
  },
  "slides": [
    {
      "id": "intro",
      "title": "Welcome",
      "blocks": [
        {
          "type": "text",
          "content": "Hello World"
        }
      ],
      "notes": ["Speaker note"]
    }
  ]
}
```

### 2. Convert HTML Content to Blocks

Break down HTML content into structured blocks:

**Text blocks:**
```json
{
  "type": "text",
  "content": "<p>Your HTML content</p>"
}
```

**List blocks:**
```json
{
  "type": "list",
  "items": ["Item 1", "Item 2"],
  "ordered": false
}
```

**Code blocks:**
```json
{
  "type": "code",
  "content": "const x = 42;",
  "language": "javascript"
}
```

### 3. Migrate Custom Components

**Snark Overlay → SnarkTerminalBox Module:**

Old:
```javascript
function showSnarkOverlay(snarkText) {
  // DOM manipulation
}
```

New:
```json
{
  "type": "module",
  "moduleName": "SnarkTerminalBox",
  "props": {
    "lines": ["// Snarky comment"],
    "typingSpeed": 50
  }
}
```

### 4. Convert Presentation Utils to React

**Navigation:**

Old:
```javascript
function navigateSlide(direction) {
  currentSlideIndex += direction;
  renderSlide(currentSlideIndex);
}
```

New:
```typescript
// Built into PresoRoot component
<PresoRoot
  deckSpec={deck}
  currentSlideIndex={index}
  onSlideChange={setIndex}
  renderSlide={renderSlide}
/>
```

**Keyboard Shortcuts:**

Old:
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') navigateSlide(1);
});
```

New: Built into PresoRoot (automatic)

### 5. Theme Migration

Convert Tailwind classes to theme variables:

**Old:**
```html
<div class="bg-gray-900 text-green-400">
```

**New:**
```json
{
  "theme": {
    "vars": {
      "colors": {
        "background": "#1a1a1a",
        "primary": "#6aaa64"
      }
    }
  }
}
```

CSS:
```css
.slide {
  background: var(--colors-background);
  color: var(--colors-primary);
}
```

### 6. Template Creation

Create a custom template for your presentation style:

```typescript
import { Template } from '@preso/core';

export const myTemplate: Template = {
  name: 'my-template',
  render: (slide, theme) => {
    return `
      <div class="my-slide">
        ${slide.title ? `<h1>${slide.title}</h1>` : ''}
        <div class="content">
          ${renderBlocks(slide.blocks)}
        </div>
      </div>
    `;
  }
};
```

## Step-by-Step Example

### Original Slide

```javascript
{
  id: "demo",
  title: "Demo Slide",
  tracker: "DEMO",
  content: `
    <div>
      <p>Hello World</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
  `,
  snark: ["// This is snarky"],
  notes: ["Speaker note"]
}
```

### Migrated Slide

```json
{
  "id": "demo",
  "title": "Demo Slide",
  "tracker": "DEMO",
  "blocks": [
    {
      "type": "text",
      "content": "Hello World"
    },
    {
      "type": "list",
      "items": ["Item 1", "Item 2"],
      "ordered": false
    },
    {
      "type": "module",
      "moduleName": "SnarkTerminalBox",
      "props": {
        "lines": ["// This is snarky"]
      }
    }
  ],
  "notes": ["Speaker note"]
}
```

## Benefits of Migration

1. **Type Safety**: TypeScript ensures correctness
2. **Modularity**: Reusable components and templates
3. **Maintainability**: Clear separation of content and presentation
4. **Testability**: Unit tests for components and logic
5. **Tooling**: CLI validation, schema checking
6. **Flexibility**: Mix and match templates, themes, modules

## Common Issues

### Issue: Custom CSS Classes Not Working

**Solution**: Convert to theme variables or CSS modules

### Issue: DOM Manipulation Code

**Solution**: Use React state and props instead

### Issue: Global State Management

**Solution**: Use React context or component state

### Issue: Animations Not Working

**Solution**: Use CSS animations or React animation libraries

## Validation

Validate your migrated deck:

```bash
preso validate deck.json
```

## Testing

Test in the studio app:

```bash
cd apps/studio
npm run dev
```

Load your deck.json and verify:
- All slides render correctly
- Navigation works
- Modules display properly
- Theme applies correctly

## Gradual Migration Strategy

You can migrate gradually:

1. Start with a subset of slides
2. Test thoroughly
3. Migrate more slides
4. Eventually retire old system

Both systems can coexist during migration.
