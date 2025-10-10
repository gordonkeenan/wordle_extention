import Ajv, { type ValidateFunction } from 'ajv';
import type { DeckSpec, Slide } from './types.js';

/**
 * JSON Schema for DeckSpec validation
 */
const deckSpecSchema = {
  type: 'object',
  required: ['version', 'metadata', 'slides'],
  properties: {
    version: { type: 'string' },
    metadata: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        date: { type: 'string' },
        description: { type: 'string' },
      },
    },
    theme: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        vars: { type: 'object' },
        cssOverrides: { type: 'string' },
      },
    },
    template: { type: 'string' },
    slides: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          template: { type: 'string' },
          blocks: {
            type: 'array',
            items: {
              type: 'object',
              required: ['type'],
              properties: {
                type: { type: 'string' },
              },
            },
          },
          tracker: {
            oneOf: [
              { type: 'string' },
              { type: 'array', items: { type: 'string' } },
            ],
          },
          notes: {
            type: 'array',
            items: { type: 'string' },
          },
          snark: {
            type: 'array',
            items: { type: 'string' },
          },
          metadata: { type: 'object' },
        },
      },
    },
    plugins: {
      type: 'array',
      items: { type: 'string' },
    },
  },
};

/**
 * Validator for presentation deck specifications
 */
export class DeckValidator {
  private ajv: Ajv;
  private validateDeckSpec: ValidateFunction;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    this.validateDeckSpec = this.ajv.compile(deckSpecSchema);
  }

  /**
   * Validate a DeckSpec object
   */
  validate(deckSpec: unknown): { valid: boolean; errors?: string[] } {
    const valid = this.validateDeckSpec(deckSpec);

    if (!valid && this.validateDeckSpec.errors) {
      const errors = this.validateDeckSpec.errors.map(
        err => `${err.instancePath} ${err.message}`
      );
      return { valid: false, errors };
    }

    return { valid: true };
  }

  /**
   * Validate and throw on error
   */
  validateOrThrow(deckSpec: unknown): asserts deckSpec is DeckSpec {
    const result = this.validate(deckSpec);
    if (!result.valid) {
      throw new Error(
        `DeckSpec validation failed:\n${result.errors?.join('\n')}`
      );
    }
  }

  /**
   * Validate a single slide
   */
  validateSlide(slide: unknown): { valid: boolean; errors?: string[] } {
    const slideSchema = deckSpecSchema.properties.slides.items;
    const validateSlide = this.ajv.compile(slideSchema);
    const valid = validateSlide(slide);

    if (!valid && validateSlide.errors) {
      const errors = validateSlide.errors.map(
        err => `${err.instancePath} ${err.message}`
      );
      return { valid: false, errors };
    }

    return { valid: true };
  }

  /**
   * Validate a slide and throw on error
   */
  validateSlideOrThrow(slide: unknown): asserts slide is Slide {
    const result = this.validateSlide(slide);
    if (!result.valid) {
      throw new Error(
        `Slide validation failed:\n${result.errors?.join('\n')}`
      );
    }
  }
}

// Export singleton instance
export const deckValidator = new DeckValidator();
