import { describe, it, expect, beforeEach } from 'vitest';
import { SlideCompiler } from '../src/SlideCompiler';
import { TemplateRegistry } from '../src/TemplateRegistry';
import type { DeckSpec, Template } from '../src/types';

describe('SlideCompiler', () => {
  let registry: TemplateRegistry;
  let compiler: SlideCompiler;

  beforeEach(() => {
    registry = new TemplateRegistry();
    const defaultTemplate: Template = {
      name: 'default',
      render: () => 'default',
    };
    registry.register('default', defaultTemplate);
    compiler = new SlideCompiler(registry);
  });

  it('should validate a valid deck', () => {
    const deck: DeckSpec = {
      title: 'Test Deck',
      slides: [
        { id: 'slide1', title: 'Slide 1' },
        { id: 'slide2', title: 'Slide 2' },
      ],
    };

    const result = compiler.validate(deck);
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('should reject deck without title', () => {
    const deck = {
      slides: [{ id: 'slide1' }],
    } as DeckSpec;

    const result = compiler.validate(deck);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors![0].code).toBe('MISSING_TITLE');
  });

  it('should reject deck without slides', () => {
    const deck = {
      title: 'Test',
    } as DeckSpec;

    const result = compiler.validate(deck);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors![0].code).toBe('INVALID_SLIDES');
  });

  it('should reject slides without IDs', () => {
    const deck: DeckSpec = {
      title: 'Test Deck',
      slides: [
        { id: 'slide1' },
        { title: 'No ID' } as any,
      ],
    };

    const result = compiler.validate(deck);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.some(e => e.code === 'MISSING_SLIDE_ID')).toBe(true);
  });

  it('should reject duplicate slide IDs', () => {
    const deck: DeckSpec = {
      title: 'Test Deck',
      slides: [
        { id: 'slide1' },
        { id: 'slide1' },
      ],
    };

    const result = compiler.validate(deck);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.some(e => e.code === 'DUPLICATE_SLIDE_IDS')).toBe(true);
  });

  it('should compile a valid deck', () => {
    const deck: DeckSpec = {
      title: 'Test Deck',
      slides: [
        { id: 'slide1', title: 'Slide 1' },
        { id: 'slide2', title: 'Slide 2' },
      ],
    };

    const compiled = compiler.compile(deck);
    expect(compiled.spec).toBe(deck);
    expect(compiled.slides.length).toBe(2);
    expect(compiled.theme).toBeDefined();
  });

  it('should merge deck theme with defaults', () => {
    const deck: DeckSpec = {
      title: 'Test Deck',
      theme: {
        colors: {
          primary: '#ff0000',
        },
      },
      slides: [{ id: 'slide1' }],
    };

    const compiled = compiler.compile(deck);
    expect(compiled.theme.colors?.primary).toBe('#ff0000');
    expect(compiled.theme.colors?.background).toBeDefined(); // from defaults
  });

  it('should use default template when slide template not found', () => {
    const deck: DeckSpec = {
      title: 'Test Deck',
      slides: [
        { id: 'slide1', template: 'nonexistent' },
      ],
    };

    const compiled = compiler.compile(deck);
    expect(compiled.slides[0].template.name).toBe('default');
  });
});
