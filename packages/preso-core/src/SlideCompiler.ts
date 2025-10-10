import type {
  DeckSpec,
  Slide,
  CompiledDeck,
  CompiledSlide,
  ValidationResult,
  ValidationError,
  SlideCompiler as ISlideCompiler,
  TemplateRegistry,
} from './types.js';

/**
 * Default theme values
 */
const DEFAULT_THEME = {
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
};

/**
 * Implementation of the slide compiler
 */
export class SlideCompiler implements ISlideCompiler {
  constructor(private templateRegistry: TemplateRegistry) {}

  /**
   * Compile a deck specification into a renderable format
   */
  compile(deckSpec: DeckSpec): CompiledDeck {
    const validation = this.validate(deckSpec);
    if (!validation.valid) {
      throw new Error(
        `Invalid deck specification: ${validation.errors?.map((e) => e.message).join(', ')}`
      );
    }

    // Deep merge theme with defaults
    const theme = {
      ...DEFAULT_THEME,
      ...deckSpec.theme,
      colors: { ...DEFAULT_THEME.colors, ...deckSpec.theme?.colors },
      fonts: { ...DEFAULT_THEME.fonts, ...deckSpec.theme?.fonts },
    };
    const slides = deckSpec.slides.map((slide) => this.compileSlide(slide, deckSpec));

    return {
      spec: deckSpec,
      slides,
      theme,
    };
  }

  /**
   * Compile a single slide
   */
  private compileSlide(slide: Slide, deckSpec: DeckSpec): CompiledSlide {
    const templateName = slide.template || 'default';
    let template = this.templateRegistry.get(templateName);

    if (!template && deckSpec.templates?.[templateName]) {
      template = deckSpec.templates[templateName];
    }

    if (!template) {
      template = this.templateRegistry.get('default');
    }

    if (!template) {
      throw new Error(`Template "${templateName}" not found and no default template available`);
    }

    return {
      id: slide.id,
      slide,
      template,
    };
  }

  /**
   * Validate a deck specification
   */
  validate(deckSpec: DeckSpec): ValidationResult {
    const errors: ValidationError[] = [];

    // Basic validation
    if (!deckSpec.title) {
      errors.push({
        path: 'title',
        message: 'Deck title is required',
        code: 'MISSING_TITLE',
      });
    }

    if (!deckSpec.slides || !Array.isArray(deckSpec.slides)) {
      errors.push({
        path: 'slides',
        message: 'Deck must contain an array of slides',
        code: 'INVALID_SLIDES',
      });
    } else {
      // Validate each slide
      deckSpec.slides.forEach((slide, index) => {
        if (!slide.id) {
          errors.push({
            path: `slides[${index}].id`,
            message: `Slide at index ${index} is missing an id`,
            code: 'MISSING_SLIDE_ID',
          });
        }
      });

      // Check for duplicate IDs
      const ids = deckSpec.slides.map((s) => s.id).filter(Boolean);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      if (duplicates.length > 0) {
        errors.push({
          path: 'slides',
          message: `Duplicate slide IDs found: ${duplicates.join(', ')}`,
          code: 'DUPLICATE_SLIDE_IDS',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
