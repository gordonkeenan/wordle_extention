# Templates Guide

Templates define how slides are rendered in the Preso framework. They are the key to creating custom presentation layouts.

## What is a Template?

A template is a function that takes a `Slide` and `ThemeVars` and returns renderable content (either HTML string or React elements).

```typescript
interface Template {
  name: string;
  description?: string;
  render: (slide: Slide, theme: ThemeVars) => string | JSX.Element;
  schema?: Record<string, any>;
}
```

## Creating a Template

### Basic Template

```typescript
import type { Template, Slide, ThemeVars } from '@preso/core';

const simpleTemplate: Template = {
  name: 'simple',
  description: 'A simple centered layout',
  render: (slide: Slide, theme: ThemeVars) => {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>{slide.title}</h1>
        {slide.blocks?.map((block, i) => (
          <div key={i}>{block.content}</div>
        ))}
      </div>
    );
  },
};
```

### Template with Styling

```typescript
const styledTemplate: Template = {
  name: 'styled',
  render: (slide: Slide, theme: ThemeVars) => {
    return (
      <div style={{
        backgroundColor: theme.colors?.background,
        color: theme.colors?.text,
        padding: '3rem',
        fontFamily: theme.fonts?.body,
      }}>
        <h1 style={{ 
          color: theme.colors?.primary,
          fontFamily: theme.fonts?.heading,
        }}>
          {slide.title}
        </h1>
        {/* Content rendering */}
      </div>
    );
  },
};
```

### Template with Block Handlers

Templates can handle different block types:

```typescript
const blockTemplate: Template = {
  name: 'blocks',
  render: (slide: Slide, theme: ThemeVars) => {
    const renderBlock = (block: SlideBlock, index: number) => {
      switch (block.type) {
        case 'html':
          return (
            <div 
              key={index} 
              dangerouslySetInnerHTML={{ __html: block.content as string }} 
            />
          );
        
        case 'text':
          return <p key={index}>{block.content}</p>;
        
        case 'image':
          return (
            <img 
              key={index} 
              src={block.props?.src} 
              alt={block.props?.alt || ''} 
            />
          );
        
        case 'code':
          return (
            <pre key={index}>
              <code>{block.content}</code>
            </pre>
          );
        
        default:
          return null;
      }
    };

    return (
      <div className="slide-content">
        <h1>{slide.title}</h1>
        {slide.blocks?.map(renderBlock)}
      </div>
    );
  },
};
```

## Registering Templates

Use the `TemplateRegistry` to register templates:

```typescript
import { TemplateRegistry } from '@preso/core';

const registry = new TemplateRegistry();

// Register templates
registry.register('simple', simpleTemplate);
registry.register('styled', styledTemplate);
registry.register('blocks', blockTemplate);

// Check if template exists
if (registry.has('simple')) {
  console.log('Simple template is registered');
}

// Get a template
const template = registry.get('simple');

// List all templates
const templateNames = registry.list();
```

## Using Templates in Slides

Specify the template in the slide definition:

```typescript
const deck: DeckSpec = {
  title: 'My Presentation',
  slides: [
    {
      id: 'intro',
      title: 'Introduction',
      template: 'simple',  // Use the 'simple' template
      blocks: [/* ... */],
    },
    {
      id: 'content',
      title: 'Content',
      template: 'styled',  // Use the 'styled' template
      blocks: [/* ... */],
    },
  ],
};
```

## Built-in Templates

The framework includes a default template that handles basic slide rendering.

### Default Template

```typescript
const defaultTemplate: Template = {
  name: 'default',
  render: (slide: Slide, theme: ThemeVars) => {
    return (
      <div className="slide-content">
        {slide.blocks?.map((block, i) => {
          if (block.type === 'html') {
            return <div key={i} dangerouslySetInnerHTML={{ __html: block.content }} />;
          }
          return <div key={i}>{block.content}</div>;
        })}
      </div>
    );
  },
};
```

## Template Best Practices

1. **Use Theme Variables**: Always use theme variables for colors, fonts, and spacing to ensure consistency.

2. **Handle Missing Data**: Check for undefined values before rendering:
   ```typescript
   {slide.title && <h1>{slide.title}</h1>}
   {slide.blocks?.map(/* ... */)}
   ```

3. **Support Multiple Block Types**: Make templates flexible by handling different block types.

4. **Responsive Design**: Use CSS that adapts to different screen sizes.

5. **Accessibility**: Include proper semantic HTML and ARIA attributes.

6. **Performance**: Memoize expensive computations and avoid inline function definitions.

## Advanced Template Patterns

### Template with Metadata

Access slide metadata:

```typescript
const metaTemplate: Template = {
  name: 'with-meta',
  render: (slide: Slide, theme: ThemeVars) => {
    const tracker = slide.meta?.tracker;
    const notes = slide.meta?.notes;
    
    return (
      <div>
        {tracker && <div className="tracker">{tracker}</div>}
        <h1>{slide.title}</h1>
        {/* Content */}
        {notes && (
          <aside className="notes">
            {notes.map((note, i) => <p key={i}>{note}</p>)}
          </aside>
        )}
      </div>
    );
  },
};
```

### Template with Custom Components

Integrate custom React components:

```typescript
import { SnarkTerminalBox } from '@preso/modules';

const terminalTemplate: Template = {
  name: 'terminal',
  render: (slide: Slide, theme: ThemeVars) => {
    const snarkMessages = slide.meta?.snark || [];
    
    return (
      <div>
        <h1>{slide.title}</h1>
        {slide.blocks?.map((block, i) => (
          <div key={i}>{block.content}</div>
        ))}
        {snarkMessages.length > 0 && (
          <SnarkTerminalBox messages={snarkMessages} />
        )}
      </div>
    );
  },
};
```

### Inline Templates

Define templates directly in the deck spec:

```typescript
const deck: DeckSpec = {
  title: 'My Presentation',
  templates: {
    custom: {
      name: 'custom',
      render: (slide, theme) => (
        <div>Custom rendering for {slide.title}</div>
      ),
    },
  },
  slides: [
    {
      id: 'slide1',
      template: 'custom',
      /* ... */
    },
  ],
};
```

## Troubleshooting

### Template Not Found

If you get "Template not found" error:
1. Ensure the template is registered before compiling the deck
2. Check the template name matches exactly
3. Verify the default template is available as fallback

### Styling Issues

If styles aren't applying:
1. Import the stylesheet: `import '@preso/react/styles.css'`
2. Check CSS variable names match theme properties
3. Verify the component structure matches the CSS selectors

### TypeScript Errors

If you get type errors:
1. Import types: `import type { Template, Slide, ThemeVars } from '@preso/core'`
2. Ensure slide.blocks is checked before mapping
3. Use optional chaining for nested properties: `theme.colors?.primary`
