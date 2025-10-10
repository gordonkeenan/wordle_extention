# Modules Guide

Modules are reusable components that can be used across presentations to add rich, interactive features.

## What is a Module?

A module is a self-contained React component that can be embedded in slides. Modules can include:
- Interactive components (animations, forms, games)
- Data visualizations (charts, graphs, diagrams)
- Media players (video, audio)
- Special effects (animations, transitions)

## Using Modules

### Importing Modules

```typescript
import { SnarkTerminalBox } from '@preso/modules';
import '@preso/modules/styles.css';
```

### Using in Templates

Modules are typically used within templates:

```typescript
import type { Template } from '@preso/core';
import { SnarkTerminalBox } from '@preso/modules';

const terminalTemplate: Template = {
  name: 'with-terminal',
  render: (slide, theme) => {
    const messages = slide.meta?.snark || [];
    
    return (
      <div>
        <h1>{slide.title}</h1>
        {/* Slide content */}
        <SnarkTerminalBox messages={messages} />
      </div>
    );
  },
};
```

## Built-in Modules

### SnarkTerminalBox

A terminal-style text box with typing animation effect.

**Props:**
- `messages: string[]` - Array of messages to display
- `typingSpeed?: number` - Speed of typing animation in ms (default: 50)
- `className?: string` - Additional CSS classes
- `autoStart?: boolean` - Start typing automatically (default: true)
- `large?: boolean` - Use larger font size (default: false)

**Example:**

```tsx
<SnarkTerminalBox 
  messages={[
    '// Starting system...',
    '// Loading modules...',
    '// Ready!'
  ]}
  typingSpeed={30}
  large={true}
/>
```

**In a slide:**

```typescript
const slide: Slide = {
  id: 'terminal-slide',
  title: 'System Status',
  meta: {
    snark: [
      '// Initializing AI overlord...',
      '// Just kidding! (or am I?)',
      '// System ready for demonstration',
    ],
  },
};
```

## Creating Custom Modules

### Basic Module Structure

```typescript
import React from 'react';

export interface MyModuleProps {
  title: string;
  data: any[];
  theme?: string;
}

export function MyModule({ title, data, theme = 'default' }: MyModuleProps) {
  return (
    <div className={`my-module theme-${theme}`}>
      <h3>{title}</h3>
      <div className="module-content">
        {data.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}
```

### Module with State

```typescript
import React, { useState, useEffect } from 'react';

export interface AnimatedModuleProps {
  items: string[];
  interval?: number;
}

export function AnimatedModule({ items, interval = 1000 }: AnimatedModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  return (
    <div className="animated-module">
      <div className="current-item">
        {items[currentIndex]}
      </div>
    </div>
  );
}
```

### Module with Styling

Create a CSS file for your module:

```css
/* my-module.css */
.my-module {
  padding: 1rem;
  border: 2px solid var(--preso-color-accent);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}

.my-module.theme-dark {
  background-color: #000;
  color: #fff;
}

.my-module.theme-light {
  background-color: #fff;
  color: #000;
}

.module-content {
  margin-top: 1rem;
}
```

Import and use:

```typescript
import './my-module.css';

export function MyModule(props: MyModuleProps) {
  // Component implementation
}
```

## Module Patterns

### Interactive Module

```typescript
import React, { useState } from 'react';

export interface QuizModuleProps {
  question: string;
  options: string[];
  correctAnswer: number;
}

export function QuizModule({ question, options, correctAnswer }: QuizModuleProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <div className="quiz-module">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`
              option 
              ${selected === i ? 'selected' : ''}
              ${revealed && i === correctAnswer ? 'correct' : ''}
              ${revealed && selected === i && i !== correctAnswer ? 'wrong' : ''}
            `}
          >
            {option}
          </button>
        ))}
      </div>
      {selected !== null && !revealed && (
        <button onClick={handleReveal}>Check Answer</button>
      )}
    </div>
  );
}
```

### Data Visualization Module

```typescript
import React from 'react';

export interface ChartModuleProps {
  data: Array<{ label: string; value: number }>;
  type?: 'bar' | 'pie' | 'line';
  color?: string;
}

export function ChartModule({ data, type = 'bar', color = '#6aaa64' }: ChartModuleProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="chart-module">
      {type === 'bar' && (
        <div className="bar-chart">
          {data.map((item, i) => (
            <div key={i} className="bar-item">
              <div 
                className="bar"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color,
                }}
              />
              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Media Module

```typescript
import React, { useRef, useState } from 'react';

export interface VideoModuleProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
}

export function VideoModule({ 
  src, 
  poster, 
  autoplay = false, 
  controls = true 
}: VideoModuleProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoplay);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="video-module">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={controls}
        autoPlay={autoplay}
        onClick={togglePlay}
      />
    </div>
  );
}
```

## Publishing Modules

### Package Structure

```
my-module/
├── src/
│   ├── MyModule.tsx
│   ├── index.ts
│   └── styles.css
├── package.json
└── tsconfig.json
```

### package.json

```json
{
  "name": "@preso/my-module",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "@preso/core": "^0.1.0"
  }
}
```

### Exporting

```typescript
// src/index.ts
export * from './MyModule';
```

## Module Best Practices

1. **Prop Types**: Always define TypeScript interfaces for props
2. **Styling**: Include scoped CSS with the module
3. **Cleanup**: Clean up effects and timers in useEffect cleanup
4. **Accessibility**: Include ARIA labels and keyboard navigation
5. **Performance**: Memoize expensive computations
6. **Documentation**: Document props and provide examples
7. **Testing**: Include unit tests for components

## Using External Libraries

Modules can integrate third-party libraries:

```typescript
import React from 'react';
import { Chart as ChartJS } from 'chart.js';

export interface AdvancedChartProps {
  data: any;
  type: string;
}

export function AdvancedChart({ data, type }: AdvancedChartProps) {
  // Use Chart.js or other library
  return (
    <div className="advanced-chart">
      {/* Chart implementation */}
    </div>
  );
}
```

## Plugin System

For more advanced use cases, modules can be packaged as plugins:

```typescript
import type { PluginModule } from '@preso/core';

export const myPlugin: PluginModule = {
  name: 'my-plugin',
  version: '1.0.0',
  components: {
    MyModule,
    AnotherModule,
  },
  hooks: {
    init: (container, props) => {
      // Initialize plugin
    },
    cleanup: () => {
      // Cleanup on unmount
    },
  },
};
```

## Future Module Ideas

- Code syntax highlighter
- Markdown renderer
- Math equation renderer (LaTeX)
- Interactive diagrams (flowcharts, UML)
- 3D visualizations
- Live code editor
- Poll/survey components
- Social media embeds
- Timer/countdown
- Progress indicators
