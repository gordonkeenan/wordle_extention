# Templates Guide

## Overview

Templates define how slides are rendered in presentations. The Preso system uses a flexible template architecture that allows you to create custom slide layouts.

## Template Structure

A template is a TypeScript/JavaScript object with the following structure:

```typescript
interface Template {
  name: string;
  render: (slide: Slide, theme: Theme) => string;
  metadata?: {
    description?: string;
    author?: string;
    version?: string;
  };
}
```

## Creating a Template

### Basic Template

```typescript
import { Template, Slide, Theme } from '@preso/core';

const basicTemplate: Template = {
  name: 'basic',
  render: (slide: Slide, theme: Theme) => {
    return `
      <div class="slide">
        ${slide.title ? `<h1>${slide.title}</h1>` : ''}
        <div class="content">
          ${renderBlocks(slide.blocks)}
        </div>
      </div>
    `;
  },
  metadata: {
    description: 'A basic slide template',
    version: '1.0.0',
  },
};
```

## Registering Templates

Templates must be registered before they can be used:

```typescript
import { templateRegistry } from '@preso/core';

templateRegistry.register('basic', basicTemplate);
```

## Using Templates

### In DeckSpec

```json
{
  "version": "1.0.0",
  "template": "basic",
  "slides": [
    {
      "id": "slide-1",
      "title": "Hello World"
    }
  ]
}
```

### Per-Slide Override

```json
{
  "id": "slide-2",
  "title": "Custom Template",
  "template": "special"
}
```

## Built-in Templates

The Preso system will include several built-in templates:

- **clean**: Minimal, focused layout (based on existing presentation)
- **modern**: Contemporary design with animations
- **classic**: Traditional presentation style

## Best Practices

1. **Keep templates simple** - Focus on layout, let themes handle styling
2. **Use semantic HTML** - Improve accessibility
3. **Support all block types** - Handle text, code, lists, images, etc.
4. **Test with different content** - Ensure layouts work with various slide structures
5. **Document your templates** - Add clear metadata and usage examples

## Template Variables

Templates can access theme variables through CSS custom properties:

```css
.slide {
  background-color: var(--colors-background);
  color: var(--colors-text);
  font-family: var(--fonts-body);
}
```

## Advanced Features

### Conditional Rendering

```typescript
render: (slide: Slide, theme: Theme) => {
  const hasNotes = slide.notes && slide.notes.length > 0;
  
  return `
    <div class="slide ${hasNotes ? 'has-notes' : ''}">
      <!-- slide content -->
    </div>
  `;
}
```

### Custom Metadata

Templates can use slide metadata for custom behavior:

```typescript
render: (slide: Slide, theme: Theme) => {
  const layout = slide.metadata?.layout || 'default';
  
  return `
    <div class="slide layout-${layout}">
      <!-- slide content -->
    </div>
  `;
}
```
