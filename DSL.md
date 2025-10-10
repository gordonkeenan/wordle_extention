# DeckSpec DSL Guide

## Overview

The DeckSpec DSL (Domain-Specific Language) defines the structure of presentations in a declarative JSON format.

## Basic Structure

```json
{
  "version": "1.0.0",
  "metadata": {
    "title": "My Presentation",
    "author": "Your Name",
    "date": "2025-01-01",
    "description": "A sample presentation"
  },
  "theme": {
    "name": "default",
    "vars": {
      "colors": {
        "primary": "#6aaa64",
        "background": "#121212"
      }
    }
  },
  "template": "clean",
  "slides": [],
  "plugins": []
}
```

## Metadata

Required information about the presentation:

```json
{
  "metadata": {
    "title": "Required: Presentation title",
    "author": "Optional: Author name",
    "date": "Optional: Date or version",
    "description": "Optional: Brief description"
  }
}
```

## Slides

An array of slide objects:

```json
{
  "slides": [
    {
      "id": "unique-slide-id",
      "title": "Slide Title",
      "template": "optional-template-override",
      "blocks": [],
      "tracker": "WORD",
      "notes": ["Speaker note 1", "Speaker note 2"],
      "snark": ["// Snarky comment"],
      "metadata": {}
    }
  ]
}
```

### Slide Properties

- **id** (required): Unique identifier for the slide
- **title** (optional): Slide title
- **template** (optional): Override default template
- **blocks** (optional): Content blocks (see below)
- **tracker** (optional): Word tracker display (string or array)
- **notes** (optional): Speaker notes
- **snark** (optional): Snark overlay text (from original presentation)
- **metadata** (optional): Custom metadata

## Block Types

### Text Block

```json
{
  "type": "text",
  "content": "Plain text or HTML content",
  "align": "left"
}
```

### Code Block

```json
{
  "type": "code",
  "content": "const x = 42;",
  "language": "javascript"
}
```

### List Block

```json
{
  "type": "list",
  "items": ["Item 1", "Item 2", "Item 3"],
  "ordered": false
}
```

### Image Block

```json
{
  "type": "image",
  "src": "path/to/image.jpg",
  "alt": "Image description",
  "width": "100%",
  "height": "auto"
}
```

### Module Block

```json
{
  "type": "module",
  "moduleName": "SnarkTerminalBox",
  "props": {
    "lines": ["Line 1", "Line 2"],
    "typingSpeed": 50
  }
}
```

## Themes

Define visual styling with theme variables:

```json
{
  "theme": {
    "name": "dark",
    "vars": {
      "colors": {
        "primary": "#6aaa64",
        "secondary": "#c9b458",
        "background": "#121212",
        "text": "#ffffff",
        "error": "#f44336"
      },
      "fonts": {
        "body": "system-ui, sans-serif",
        "heading": "system-ui, sans-serif",
        "mono": "Monaco, Consolas, monospace"
      },
      "spacing": {
        "xs": "0.25rem",
        "sm": "0.5rem",
        "md": "1rem",
        "lg": "2rem",
        "xl": "4rem"
      }
    },
    "cssOverrides": ".slide { border: 2px solid red; }"
  }
}
```

## Plugins

List of plugin modules to load:

```json
{
  "plugins": [
    "SnarkTerminalBox",
    "CustomModule"
  ]
}
```

## Complete Example

```json
{
  "version": "1.0.0",
  "metadata": {
    "title": "Couch Coding",
    "author": "Gordon Keenan",
    "date": "2025"
  },
  "theme": {
    "name": "wordle",
    "vars": {
      "colors": {
        "primary": "#6aaa64",
        "background": "#121212",
        "text": "#ffffff"
      }
    }
  },
  "template": "clean",
  "slides": [
    {
      "id": "intro",
      "title": "Welcome",
      "blocks": [
        {
          "type": "text",
          "content": "Building software from your couch"
        },
        {
          "type": "module",
          "moduleName": "SnarkTerminalBox",
          "props": {
            "lines": ["// This should be interesting..."]
          }
        }
      ],
      "notes": ["Introduce the topic"]
    },
    {
      "id": "features",
      "title": "Key Features",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Mobile development",
            "AI assistance",
            "Version control"
          ]
        }
      ]
    }
  ],
  "plugins": ["SnarkTerminalBox"]
}
```

## Validation

Validate your DeckSpec with the CLI:

```bash
preso validate my-deck.json
```

Or programmatically:

```typescript
import { DeckValidator } from '@preso/core';

const validator = new DeckValidator();
const result = validator.validate(deckSpec);

if (!result.valid) {
  console.error(result.errors);
}
```

## Markdown Support

Convert Markdown to DeckSpec:

```typescript
import { MarkdownToSlide } from '@preso/core';

const markdown = `
# First Slide

This is the content

---

# Second Slide

More content here
`;

const slides = MarkdownToSlide.parse(markdown);
```

## Best Practices

1. **Use descriptive IDs** - Makes debugging easier
2. **Keep slides focused** - One concept per slide
3. **Leverage blocks** - Use appropriate block types
4. **Add speaker notes** - Document your intent
5. **Validate early** - Catch errors before presenting
6. **Version control** - Track changes to presentations
