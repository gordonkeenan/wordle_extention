# Preso Framework

A modern, React-based presentation framework with an extensible template system.

## Overview

The Preso Framework is a monorepo containing packages for building interactive presentations with React. It provides:

- **Type-safe architecture** with TypeScript
- **Component-based rendering** with React
- **Extensible template system** for custom slide layouts
- **Theme customization** using CSS variables
- **Plugin support** for extending functionality
- **Markdown parsing** for easy slide authoring

## Architecture

The framework is organized as a monorepo with the following packages:

### Packages

#### `@preso/core`
Core types, interfaces, and engine for the presentation framework.

**Key exports:**
- Type definitions: `DeckSpec`, `Slide`, `SlideBlock`, `Template`, `Theme`, etc.
- `TemplateRegistry`: Manages template registration and retrieval
- `SlideCompiler`: Compiles deck specifications into renderable format
- `ThemeVars`: Utilities for theme management and CSS variable conversion
- `MarkdownParser`: Parses markdown into slide structures

#### `@preso/react`
React components for rendering presentations.

**Key components:**
- `PresoRoot`: Root component that sets up theme and renders slides
- `SlideHost`: Renders individual slides with header and content
- `TemplateHost`: Renders slide content using templates
- `PluginHost`: Hosts plugin components
- `useTheme`: React hook for accessing theme context

#### `@preso/modules`
Reusable presentation modules and components.

**Modules:**
- `SnarkTerminalBox`: Terminal-style text box with typing animation

### Apps

#### `apps/demo`
Demo application showcasing the framework capabilities.

## Getting Started

### Installation

```bash
# Install all dependencies
npm install --legacy-peer-deps

# Build all packages
npm run build:packages
```

### Building Packages

Build individual packages:

```bash
# Build preso-core
cd packages/preso-core && npm run build

# Build preso-react
cd packages/preso-react && npm run build

# Build preso-modules
cd packages/preso-modules && npm run build
```

### Running the Demo

```bash
# Navigate to demo app
cd apps/demo

# Start development server
npm run dev

# Or build for production
npm run build
```

## Usage

### Creating a Simple Presentation

```typescript
import React, { useState } from 'react';
import type { DeckSpec, Template } from '@preso/core';
import { TemplateRegistry, SlideCompiler } from '@preso/core';
import { PresoRoot } from '@preso/react';
import '@preso/react/styles.css';

// Define a template
const defaultTemplate: Template = {
  name: 'default',
  render: (slide, theme) => (
    <div>
      {slide.blocks?.map((block, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: block.content }} />
      ))}
    </div>
  ),
};

// Create deck specification
const deck: DeckSpec = {
  title: 'My Presentation',
  theme: {
    colors: {
      primary: '#6aaa64',
      background: '#121212',
      text: '#ffffff',
    },
  },
  slides: [
    {
      id: 'slide-1',
      title: 'Welcome',
      blocks: [
        {
          type: 'html',
          content: '<h2>Hello World!</h2>',
        },
      ],
    },
  ],
};

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const registry = new TemplateRegistry();
  registry.register('default', defaultTemplate);
  
  const compiler = new SlideCompiler(registry);
  const compiledDeck = compiler.compile(deck);

  return (
    <PresoRoot 
      deck={compiledDeck} 
      currentSlide={currentSlide}
    />
  );
}
```

### Creating Custom Templates

Templates define how slides are rendered:

```typescript
import type { Template, Slide, ThemeVars } from '@preso/core';

const customTemplate: Template = {
  name: 'custom',
  description: 'Custom template with special layout',
  render: (slide: Slide, theme: ThemeVars) => {
    return (
      <div style={{ 
        backgroundColor: theme.colors?.background,
        color: theme.colors?.text,
        padding: '2rem',
      }}>
        <h1>{slide.title}</h1>
        {/* Custom rendering logic */}
      </div>
    );
  },
};
```

### Using Markdown

Parse markdown into slides:

```typescript
import { parseMarkdownSlides } from '@preso/core';

const markdown = `
# First Slide
This is the content

---

# Second Slide
More content here
`;

const slides = parseMarkdownSlides(markdown);
```

## Development

### Project Structure

```
.
├── packages/
│   ├── preso-core/       # Core types and engine
│   ├── preso-react/      # React components
│   └── preso-modules/    # Reusable modules
├── apps/
│   ├── demo/             # Demo application
│   ├── studio/           # (Future) Visual editor
│   └── cli/              # (Future) CLI tools
└── presentation/         # Legacy presentation code
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Migrating from Legacy Presentation

The legacy presentation system (`presentation/`) uses vanilla JavaScript with:
- `slides-data.js`: Slide content definitions
- `presentation-utils.js`: Rendering and navigation logic
- `presentation-styles.css`: Styling

To migrate to the new framework:

1. **Extract slide data** from `slides-data.js` into `DeckSpec` format
2. **Create templates** for different slide layouts
3. **Port JavaScript logic** to React components
4. **Apply theme** using the new theme system

See the demo app (`apps/demo`) for a working example.

## Future Enhancements

- [ ] Visual studio app for editing presentations
- [ ] CLI tool for rendering and exporting (PDF, PNG)
- [ ] More built-in templates
- [ ] Storybook integration
- [ ] E2E testing with Playwright
- [ ] Additional modules (charts, diagrams, code highlighting)

## License

MIT
