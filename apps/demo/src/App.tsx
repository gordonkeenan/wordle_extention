import React, { useState } from 'react';
import type { DeckSpec, Template, Slide, ThemeVars } from '@preso/core';
import { TemplateRegistry, SlideCompiler } from '@preso/core';
import { PresoRoot } from '@preso/react';
import '@preso/react/styles.css';
import '@preso/modules/styles.css';
import './App.css';

// Create a simple default template
const defaultTemplate: Template = {
  name: 'default',
  description: 'Default template with simple layout',
  render: (slide: Slide, theme: ThemeVars) => {
    return (
      <div className="slide-content">
        {slide.blocks?.map((block, i) => {
          if (block.type === 'html' && typeof block.content === 'string') {
            return <div key={i} dangerouslySetInnerHTML={{ __html: block.content }} />;
          }
          if (block.type === 'text' && typeof block.content === 'string') {
            return <p key={i}>{block.content}</p>;
          }
          return null;
        })}
      </div>
    );
  },
};

// Sample deck specification
const sampleDeck: DeckSpec = {
  title: 'Preso Framework Demo',
  author: 'Gordon Keenan',
  date: '2025',
  theme: {
    colors: {
      primary: '#6aaa64',
      secondary: '#c9b458',
      background: '#121212',
      text: '#ffffff',
      accent: '#787c7e',
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      mono: 'monospace',
    },
  },
  slides: [
    {
      id: 'welcome',
      title: 'Welcome to Preso Framework',
      blocks: [
        {
          type: 'html',
          content: `
            <div style="text-align: center; padding: 2rem;">
              <h2 style="font-size: 3rem; margin-bottom: 1rem;">🎉 Preso Framework</h2>
              <p style="font-size: 1.5rem; color: #c9b458;">
                A React-based extensible presentation framework
              </p>
              <p style="font-size: 1.2rem; margin-top: 2rem; color: #787c7e;">
                Built with TypeScript, React, and modern web technologies
              </p>
            </div>
          `,
        },
      ],
    },
    {
      id: 'features',
      title: 'Key Features',
      blocks: [
        {
          type: 'html',
          content: `
            <div style="padding: 2rem;">
              <ul style="font-size: 1.5rem; line-height: 2; list-style: none;">
                <li>✅ TypeScript-first architecture</li>
                <li>✅ React component-based rendering</li>
                <li>✅ Extensible template system</li>
                <li>✅ Theme customization with CSS variables</li>
                <li>✅ Plugin support for custom modules</li>
                <li>✅ Markdown parsing support</li>
              </ul>
            </div>
          `,
        },
      ],
    },
    {
      id: 'architecture',
      title: 'Architecture',
      blocks: [
        {
          type: 'html',
          content: `
            <div style="padding: 2rem;">
              <h3 style="font-size: 2rem; margin-bottom: 1rem; color: #6aaa64;">Package Structure</h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div style="background: rgba(106, 170, 100, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #6aaa64;">
                  <strong>@preso/core</strong>
                  <p style="font-size: 0.9rem; color: #787c7e;">Types & Engine</p>
                </div>
                <div style="background: rgba(201, 180, 88, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #c9b458;">
                  <strong>@preso/react</strong>
                  <p style="font-size: 0.9rem; color: #787c7e;">React Components</p>
                </div>
                <div style="background: rgba(120, 124, 126, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #787c7e;">
                  <strong>@preso/modules</strong>
                  <p style="font-size: 0.9rem; color: #787c7e;">Reusable Modules</p>
                </div>
              </div>
            </div>
          `,
        },
      ],
    },
  ],
};

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Set up template registry and compile deck
  const registry = new TemplateRegistry();
  registry.register('default', defaultTemplate);
  
  const compiler = new SlideCompiler(registry);
  const compiledDeck = compiler.compile(sampleDeck);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' && currentSlide < compiledDeck.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="app" onKeyDown={handleKeyDown} tabIndex={0}>
      <PresoRoot 
        deck={compiledDeck} 
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />
      <div className="controls">
        <button 
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
        >
          Previous
        </button>
        <span>
          {currentSlide + 1} / {compiledDeck.slides.length}
        </span>
        <button 
          onClick={() => setCurrentSlide(Math.min(compiledDeck.slides.length - 1, currentSlide + 1))}
          disabled={currentSlide === compiledDeck.slides.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
