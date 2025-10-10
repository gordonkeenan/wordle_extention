import { describe, it, expect } from 'vitest';
import { DeckValidator } from '../DeckValidator';
import type { DeckSpec } from '../types';

describe('DeckValidator', () => {
  const validDeck: DeckSpec = {
    version: '1.0.0',
    metadata: {
      title: 'Test Deck',
      author: 'Test Author',
    },
    slides: [
      {
        id: 'slide-1',
        title: 'Test Slide',
        blocks: [
          {
            type: 'text',
            content: 'Hello World',
          },
        ],
      },
    ],
  };

  it('should validate a valid deck spec', () => {
    const validator = new DeckValidator();
    const result = validator.validate(validDeck);
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('should reject deck without version', () => {
    const validator = new DeckValidator();
    const invalidDeck = { ...validDeck };
    delete (invalidDeck as any).version;
    
    const result = validator.validate(invalidDeck);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it('should reject deck without metadata', () => {
    const validator = new DeckValidator();
    const invalidDeck = { ...validDeck };
    delete (invalidDeck as any).metadata;
    
    const result = validator.validate(invalidDeck);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it('should reject deck without metadata.title', () => {
    const validator = new DeckValidator();
    const invalidDeck = {
      ...validDeck,
      metadata: {},
    };
    
    const result = validator.validate(invalidDeck);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it('should reject deck without slides', () => {
    const validator = new DeckValidator();
    const invalidDeck = { ...validDeck };
    delete (invalidDeck as any).slides;
    
    const result = validator.validate(invalidDeck);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it('should validate deck with theme', () => {
    const validator = new DeckValidator();
    const deckWithTheme = {
      ...validDeck,
      theme: {
        name: 'test',
        vars: {
          colors: {
            primary: '#000',
          },
        },
      },
    };
    
    const result = validator.validate(deckWithTheme);
    expect(result.valid).toBe(true);
  });

  it('should validate slide with tracker', () => {
    const validator = new DeckValidator();
    const result = validator.validateSlide({
      id: 'test',
      tracker: 'WORD',
    });
    expect(result.valid).toBe(true);
  });

  it('should validate slide with tracker array', () => {
    const validator = new DeckValidator();
    const result = validator.validateSlide({
      id: 'test',
      tracker: ['WORD1', 'WORD2'],
    });
    expect(result.valid).toBe(true);
  });

  it('should throw on invalid deck with validateOrThrow', () => {
    const validator = new DeckValidator();
    const invalidDeck = {};
    
    expect(() => validator.validateOrThrow(invalidDeck)).toThrow();
  });

  it('should not throw on valid deck with validateOrThrow', () => {
    const validator = new DeckValidator();
    
    expect(() => validator.validateOrThrow(validDeck)).not.toThrow();
  });
});
