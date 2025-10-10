# DSL (Domain Specific Language) Guide

The Preso framework uses a declarative DSL for defining presentations. This guide covers the syntax and patterns.

## Overview

The Preso DSL is based on JSON/TypeScript object notation, making it easy to author presentations programmatically or load from external sources.

## Core Concepts

### DeckSpec

The root of every presentation:

```typescript
interface DeckSpec {
  title: string;              // Presentation title
  author?: string;            // Author name
  date?: string;              // Presentation date
  theme?: ThemeVars;          // Theme customization
  slides: Slide[];            // Array of slides
  templates?: Record<string, Template>;  // Custom templates
  plugins?: string[];         // Plugin names
}
```

**Example:**

```typescript
const deck: DeckSpec = {
  title: 'My Presentation',
  author: 'John Doe',
  date: '2025-01-15',
  theme: {
    colors: {
      primary: '#6aaa64',
      background: '#121212',
    },
  },
  slides: [
    // Slides here
  ],
};
```

### Slide

Individual slide definition:

```typescript
interface Slide {
  id: string;                 // Unique identifier
  title?: string;             // Slide title
  template?: string;          // Template name
  blocks?: SlideBlock[];      // Content blocks
  meta?: {                    // Metadata
    tracker?: string;
    notes?: string[];
    [key: string]: any;
  };
}
```

**Example:**

```typescript
const slide: Slide = {
  id: 'intro',
  title: 'Introduction',
  template: 'default',
  blocks: [
    {
      type: 'text',
      content: 'Welcome to the presentation',
    },
  ],
  meta: {
    notes: [
      'Start with a warm greeting',
      'Introduce the topic',
    ],
  },
};
```

### SlideBlock

Content blocks within slides:

```typescript
interface SlideBlock {
  type: string;               // Block type (html, text, image, etc.)
  props?: Record<string, any>; // Block properties
  content?: string | SlideBlock[]; // Block content
  children?: SlideBlock[];    // Child blocks
}
```

**Block Types:**

1. **Text Block**
   ```typescript
   {
     type: 'text',
     content: 'Plain text content'
   }
   ```

2. **HTML Block**
   ```typescript
   {
     type: 'html',
     content: '<div><h2>Rich HTML</h2></div>'
   }
   ```

3. **Image Block**
   ```typescript
   {
     type: 'image',
     props: {
       src: '/path/to/image.jpg',
       alt: 'Description',
       width: '100%'
     }
   }
   ```

4. **Code Block**
   ```typescript
   {
     type: 'code',
     props: {
       language: 'javascript'
     },
     content: 'const x = 42;'
   }
   ```

5. **List Block**
   ```typescript
   {
     type: 'list',
     props: {
       ordered: true
     },
     children: [
       { type: 'text', content: 'First item' },
       { type: 'text', content: 'Second item' }
     ]
   }
   ```

### Theme

Theme customization:

```typescript
interface ThemeVars {
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    accent?: string;
    [key: string]: string | undefined;
  };
  fonts?: {
    heading?: string;
    body?: string;
    mono?: string;
    [key: string]: string | undefined;
  };
  spacing?: {
    [key: string]: string;
  };
  [key: string]: any;
}
```

**Example:**

```typescript
const theme: ThemeVars = {
  colors: {
    primary: '#6aaa64',
    secondary: '#c9b458',
    background: '#121212',
    text: '#ffffff',
    accent: '#787c7e',
    success: '#00ff00',
    error: '#ff0000',
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Open Sans, sans-serif',
    mono: 'Fira Code, monospace',
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },
};
```

## Complete Example

### Simple Presentation

```typescript
import type { DeckSpec } from '@preso/core';

const simpleDeck: DeckSpec = {
  title: 'Introduction to React',
  author: 'Jane Developer',
  date: '2025-01-15',
  slides: [
    {
      id: 'title',
      title: 'Introduction to React',
      blocks: [
        {
          type: 'html',
          content: `
            <div style="text-align: center;">
              <h1>Introduction to React</h1>
              <p>Building Modern UIs</p>
            </div>
          `,
        },
      ],
    },
    {
      id: 'what-is-react',
      title: 'What is React?',
      blocks: [
        {
          type: 'text',
          content: 'React is a JavaScript library for building user interfaces.',
        },
        {
          type: 'list',
          props: { ordered: false },
          children: [
            { type: 'text', content: 'Component-based' },
            { type: 'text', content: 'Declarative' },
            { type: 'text', content: 'Learn once, write anywhere' },
          ],
        },
      ],
    },
  ],
};
```

### Advanced Presentation

```typescript
const advancedDeck: DeckSpec = {
  title: 'Advanced Topics',
  author: 'Senior Developer',
  date: '2025-01-15',
  theme: {
    colors: {
      primary: '#61dafb',
      background: '#282c34',
      text: '#ffffff',
    },
    fonts: {
      heading: 'Roboto, sans-serif',
      body: 'Arial, sans-serif',
      mono: 'Source Code Pro, monospace',
    },
  },
  templates: {
    code: {
      name: 'code',
      render: (slide, theme) => (
        <div style={{ 
          backgroundColor: '#1e1e1e',
          padding: '2rem',
          fontFamily: theme.fonts?.mono,
        }}>
          <h2>{slide.title}</h2>
          {slide.blocks?.map((block, i) => (
            <pre key={i}><code>{block.content}</code></pre>
          ))}
        </div>
      ),
    },
  },
  slides: [
    {
      id: 'hooks',
      title: 'React Hooks',
      template: 'code',
      blocks: [
        {
          type: 'code',
          props: { language: 'javascript' },
          content: `
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
          `.trim(),
        },
      ],
      meta: {
        notes: [
          'Explain useState hook',
          'Show how state updates trigger re-renders',
        ],
      },
    },
  ],
};
```

## Markdown DSL

The framework supports markdown for slide authoring:

```markdown
---
id: intro
template: default
---

# Introduction

This is the first slide content.

---

# Second Slide

- Bullet point 1
- Bullet point 2
- Bullet point 3

---

# Code Example

```javascript
const greeting = 'Hello World';
console.log(greeting);
```
```

**Parsing Markdown:**

```typescript
import { parseMarkdownSlides } from '@preso/core';

const markdown = `
# First Slide
Content here

---

# Second Slide
More content
`;

const slides = parseMarkdownSlides(markdown);
```

## JSON Format

Presentations can be defined in JSON:

```json
{
  "title": "My Presentation",
  "author": "John Doe",
  "slides": [
    {
      "id": "intro",
      "title": "Introduction",
      "blocks": [
        {
          "type": "text",
          "content": "Welcome!"
        }
      ]
    }
  ]
}
```

**Loading JSON:**

```typescript
import deckData from './presentation.json';
import type { DeckSpec } from '@preso/core';

const deck: DeckSpec = deckData;
```

## YAML Format (Future)

Future versions may support YAML:

```yaml
title: My Presentation
author: John Doe
slides:
  - id: intro
    title: Introduction
    blocks:
      - type: text
        content: Welcome!
  - id: content
    title: Main Content
    blocks:
      - type: html
        content: <h2>Hello World</h2>
```

## Best Practices

### 1. Use Unique IDs

Always use unique, descriptive IDs:

```typescript
// Good
{ id: 'intro-welcome' }
{ id: 'section-2-overview' }

// Bad
{ id: 'slide1' }
{ id: 'slide2' }
```

### 2. Organize Content with Blocks

Break content into logical blocks:

```typescript
blocks: [
  {
    type: 'html',
    content: '<h2>Section Title</h2>',
  },
  {
    type: 'text',
    content: 'Introduction paragraph',
  },
  {
    type: 'list',
    children: [/* list items */],
  },
]
```

### 3. Use Metadata

Store speaker notes and additional data:

```typescript
meta: {
  notes: ['Talk about...', 'Remember to mention...'],
  duration: '5 minutes',
  tags: ['intro', 'important'],
}
```

### 4. Theme Consistency

Define theme once, reference throughout:

```typescript
const theme: ThemeVars = {
  colors: {
    primary: '#6aaa64',
    secondary: '#c9b458',
  },
};

const deck: DeckSpec = {
  theme,
  slides: [/* ... */],
};
```

### 5. Reusable Templates

Create templates for common patterns:

```typescript
const templates = {
  'title-slide': titleTemplate,
  'content-slide': contentTemplate,
  'code-slide': codeTemplate,
};

const deck: DeckSpec = {
  templates,
  slides: [
    { id: 'intro', template: 'title-slide' },
    { id: 'content', template: 'content-slide' },
    { id: 'code', template: 'code-slide' },
  ],
};
```

## Validation

The framework validates deck specifications:

```typescript
import { SlideCompiler, TemplateRegistry } from '@preso/core';

const registry = new TemplateRegistry();
const compiler = new SlideCompiler(registry);

const validation = compiler.validate(deck);

if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
  validation.errors?.forEach(error => {
    console.error(`${error.path}: ${error.message}`);
  });
}
```

## Type Safety

Use TypeScript for type-safe DSL:

```typescript
import type { DeckSpec, Slide, SlideBlock } from '@preso/core';

// Type-safe deck creation
const deck: DeckSpec = {
  title: 'My Deck',
  slides: [], // TypeScript ensures correct structure
};

// Type-safe slide creation
const slide: Slide = {
  id: 'my-slide',
  blocks: [], // TypeScript validates block structure
};

// Type-safe block creation
const block: SlideBlock = {
  type: 'text',
  content: 'Hello', // TypeScript ensures content is string
};
```

## Common Patterns

### Split Content Pattern

```typescript
const splitSlide: Slide = {
  id: 'split',
  blocks: [
    {
      type: 'html',
      content: `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>Left content</div>
          <div>Right content</div>
        </div>
      `,
    },
  ],
};
```

### Image with Caption

```typescript
const imageSlide: Slide = {
  id: 'image',
  blocks: [
    {
      type: 'image',
      props: {
        src: '/image.jpg',
        alt: 'Description',
      },
    },
    {
      type: 'text',
      content: 'Image caption goes here',
    },
  ],
};
```

### Code with Explanation

```typescript
const codeSlide: Slide = {
  id: 'code',
  blocks: [
    {
      type: 'text',
      content: 'Here is how it works:',
    },
    {
      type: 'code',
      props: { language: 'javascript' },
      content: 'const result = calculate();',
    },
    {
      type: 'text',
      content: 'This calculates the result efficiently.',
    },
  ],
};
```
