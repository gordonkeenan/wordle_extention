import { useState } from 'react';
import type { DeckSpec, Slide, Theme } from '@preso/core';
import { ThemeVarsHandler } from '@preso/core';
import { PresoRoot } from '@preso/react';
import '@preso/react/styles.css';
import '@preso/modules/styles.css';
import { SlideListEditor } from './components/SlideListEditor';
import { ThemeEditor } from './components/ThemeEditor';
import './App.css';

// Sample deck spec
const sampleDeck: DeckSpec = {
  version: '1.0.0',
  metadata: {
    title: 'Sample Presentation',
    author: 'Preso Studio',
    description: 'A sample presentation created with Preso Studio',
  },
  theme: ThemeVarsHandler.createDefault(),
  slides: [
    {
      id: 'slide-1',
      title: 'Welcome to Preso Studio',
      blocks: [
        {
          type: 'text',
          content: 'This is a sample presentation created with the new Preso system.',
        },
      ],
      notes: ['Welcome slide with introduction'],
    },
    {
      id: 'slide-2',
      title: 'Features',
      blocks: [
        {
          type: 'list',
          items: [
            'TypeScript-first architecture',
            'React components',
            'Markdown support',
            'Theme system',
            'Plugin modules',
          ],
          ordered: false,
        },
      ],
      notes: ['List of key features'],
    },
  ],
};

function App() {
  const [deckSpec, setDeckSpec] = useState<DeckSpec>(sampleDeck);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  const renderSlide = (slide: Slide) => {
    return (
      <div>
        {slide.blocks?.map((block, index) => {
          switch (block.type) {
            case 'text':
              return <p key={index}>{(block as any).content}</p>;
            case 'list':
              const listBlock = block as any;
              const ListTag = listBlock.ordered ? 'ol' : 'ul';
              return (
                <ListTag key={index}>
                  {listBlock.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ListTag>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  const handleUpdateSlides = (slides: Slide[]) => {
    setDeckSpec({ ...deckSpec, slides });
  };

  const handleUpdateTheme = (theme: Theme) => {
    setDeckSpec({ ...deckSpec, theme });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 Preso Studio</h1>
        <div className="view-toggle">
          <button
            className={viewMode === 'edit' ? 'active' : ''}
            onClick={() => setViewMode('edit')}
          >
            Edit
          </button>
          <button
            className={viewMode === 'preview' ? 'active' : ''}
            onClick={() => setViewMode('preview')}
          >
            Preview
          </button>
        </div>
      </header>

      <div className="app-content">
        {viewMode === 'edit' ? (
          <div className="editor-layout">
            <div className="editor-sidebar">
              <section className="editor-section">
                <h2>Slides</h2>
                <SlideListEditor
                  slides={deckSpec.slides}
                  currentSlide={currentSlide}
                  onUpdateSlides={handleUpdateSlides}
                  onSelectSlide={setCurrentSlide}
                />
              </section>
              <section className="editor-section">
                <h2>Theme</h2>
                <ThemeEditor
                  theme={deckSpec.theme || ThemeVarsHandler.createDefault()}
                  onUpdateTheme={handleUpdateTheme}
                />
              </section>
            </div>
            <div className="editor-preview">
              <PresoRoot
                deckSpec={deckSpec}
                currentSlideIndex={currentSlide}
                onSlideChange={setCurrentSlide}
                renderSlide={renderSlide}
              />
            </div>
          </div>
        ) : (
          <div className="fullscreen-preview">
            <PresoRoot
              deckSpec={deckSpec}
              currentSlideIndex={currentSlide}
              onSlideChange={setCurrentSlide}
              renderSlide={renderSlide}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
