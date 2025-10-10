# Modules Guide

## Overview

Modules are reusable UI components that can be embedded in slides. They extend the basic slide blocks with custom functionality.

## Module Structure

A module is a React component with associated metadata:

```typescript
interface PluginModule {
  name: string;
  version: string;
  component: React.ComponentType;
  schema?: object;
  styles?: string;
}
```

## Built-in Modules

### SnarkTerminalBox

A terminal-style text display with typing animation.

**Usage:**

```json
{
  "type": "module",
  "moduleName": "SnarkTerminalBox",
  "props": {
    "lines": [
      "// This is a snarky comment",
      "// Another witty remark"
    ],
    "typingSpeed": 50,
    "large": false
  }
}
```

**Props:**

- `lines` (string[]): Lines of text to display
- `typingSpeed` (number): Milliseconds per character (default: 50)
- `large` (boolean): Use larger text size (default: false)
- `autoStart` (boolean): Start typing automatically (default: true)
- `cursor` (boolean): Show typing cursor (default: true)

## Creating Custom Modules

### Step 1: Create Component

```typescript
// MyCustomModule.tsx
import { useState } from 'react';

export interface MyCustomModuleProps {
  title: string;
  items: string[];
}

export function MyCustomModule({ title, items }: MyCustomModuleProps) {
  return (
    <div className="my-custom-module">
      <h3>{title}</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Step 2: Register Module

```typescript
import { registerPlugin } from '@preso/react';
import { MyCustomModule } from './MyCustomModule';

registerPlugin('MyCustomModule', MyCustomModule);
```

### Step 3: Use in Slides

```json
{
  "type": "module",
  "moduleName": "MyCustomModule",
  "props": {
    "title": "Features",
    "items": ["Fast", "Flexible", "Fun"]
  }
}
```

## Module Schema

Define a JSON schema to validate module props:

```typescript
export const MyCustomModuleMeta = {
  name: 'MyCustomModule',
  version: '1.0.0',
  description: 'Displays a titled list',
  schema: {
    type: 'object',
    required: ['title', 'items'],
    properties: {
      title: {
        type: 'string',
        description: 'Module title',
      },
      items: {
        type: 'array',
        items: { type: 'string' },
        description: 'List items',
      },
    },
  },
};
```

## Module Styles

Include CSS styles with your module:

```css
/* MyCustomModule.css */
.my-custom-module {
  padding: var(--spacing-lg);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.my-custom-module h3 {
  color: var(--colors-primary);
  margin-bottom: var(--spacing-md);
}
```

## Best Practices

1. **Keep modules focused** - One responsibility per module
2. **Use TypeScript** - Type safety improves reliability
3. **Provide schema** - Help users understand required props
4. **Style with theme variables** - Ensure consistency
5. **Handle errors gracefully** - Don't crash the presentation
6. **Test thoroughly** - Modules should work in various contexts

## Available Modules

| Module | Description | Version |
|--------|-------------|---------|
| SnarkTerminalBox | Terminal-style typing animation | 1.0.0 |

## Publishing Modules

Modules can be published as npm packages:

```json
{
  "name": "@preso-modules/my-module",
  "peerDependencies": {
    "@preso/react": "^0.1.0",
    "react": "^18.0.0"
  }
}
```

Then import and register:

```typescript
import { MyModule } from '@preso-modules/my-module';
import { registerPlugin } from '@preso/react';

registerPlugin('MyModule', MyModule);
```
