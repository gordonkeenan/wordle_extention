/**
 * Core type definitions for the presentation framework
 */

/**
 * Theme variables that can be applied to presentations
 */
export interface ThemeVars {
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    accent?: string;
    [key: string]: string | undefined;
  };
  fonts?: {
    heading?: string;
    body?: string;
    mono?: string;
    [key: string]: string | undefined;
  };
  spacing?: {
    [key: string]: string;
  };
  [key: string]: any;
}

/**
 * A single content block within a slide
 */
export interface SlideBlock {
  type: string;
  props?: Record<string, any>;
  content?: string | SlideBlock[];
  children?: SlideBlock[];
}

/**
 * A single slide definition
 */
export interface Slide {
  id: string;
  title?: string;
  template?: string;
  blocks?: SlideBlock[];
  meta?: {
    tracker?: string;
    notes?: string[];
    snark?: string[];
    [key: string]: any;
  };
}

/**
 * Complete deck specification
 */
export interface DeckSpec {
  title: string;
  author?: string;
  date?: string;
  theme?: ThemeVars;
  slides: Slide[];
  templates?: Record<string, Template>;
  plugins?: string[];
}

/**
 * Template definition for rendering slides
 */
export interface Template {
  name: string;
  description?: string;
  render: (slide: Slide, theme: ThemeVars) => string | JSX.Element;
  schema?: Record<string, any>;
}

/**
 * Plugin module for extending functionality
 */
export interface PluginModule {
  name: string;
  version: string;
  components?: Record<string, any>;
  templates?: Record<string, Template>;
  hooks?: Record<string, (...args: any[]) => any>;
}

/**
 * Registry for managing templates
 */
export interface TemplateRegistry {
  register(name: string, template: Template): void;
  get(name: string): Template | undefined;
  list(): string[];
  has(name: string): boolean;
}

/**
 * Slide compiler for processing deck specifications
 */
export interface SlideCompiler {
  compile(deckSpec: DeckSpec): CompiledDeck;
  validate(deckSpec: DeckSpec): ValidationResult;
}

/**
 * Compiled deck ready for rendering
 */
export interface CompiledDeck {
  spec: DeckSpec;
  slides: CompiledSlide[];
  theme: ThemeVars;
}

/**
 * Compiled slide with resolved template
 */
export interface CompiledSlide {
  id: string;
  slide: Slide;
  template: Template;
  rendered?: any;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
}

/**
 * Validation error
 */
export interface ValidationError {
  path: string;
  message: string;
  code?: string;
}
