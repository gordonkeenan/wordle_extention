/**
 * Core type definitions for the presentation system
 */

/**
 * Base block type for slide content
 */
export interface SlideBlock {
  type: string;
  [key: string]: unknown;
}

/**
 * Text block
 */
export interface TextBlock extends SlideBlock {
  type: 'text';
  content: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Code block
 */
export interface CodeBlock extends SlideBlock {
  type: 'code';
  content: string;
  language?: string;
}

/**
 * Image block
 */
export interface ImageBlock extends SlideBlock {
  type: 'image';
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

/**
 * List block
 */
export interface ListBlock extends SlideBlock {
  type: 'list';
  items: string[];
  ordered?: boolean;
}

/**
 * Custom module block
 */
export interface ModuleBlock extends SlideBlock {
  type: 'module';
  moduleName: string;
  props?: Record<string, unknown>;
}

/**
 * A single slide in the presentation
 */
export interface Slide {
  id: string;
  title?: string;
  template?: string;
  blocks?: SlideBlock[];
  tracker?: string | string[];
  notes?: string[];
  snark?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Theme variable definitions
 */
export interface ThemeVars {
  colors?: Record<string, string>;
  fonts?: Record<string, string>;
  spacing?: Record<string, string>;
  [key: string]: Record<string, string> | undefined;
}

/**
 * Theme definition
 */
export interface Theme {
  name: string;
  vars: ThemeVars;
  cssOverrides?: string;
}

/**
 * Template definition
 */
export interface Template {
  name: string;
  render: (slide: Slide, theme: Theme) => string;
  metadata?: {
    description?: string;
    author?: string;
    version?: string;
  };
}

/**
 * Plugin module definition
 */
export interface PluginModule {
  name: string;
  version: string;
  component: unknown;
  schema?: object;
  styles?: string;
}

/**
 * Complete deck specification
 */
export interface DeckSpec {
  version: string;
  metadata: {
    title: string;
    author?: string;
    date?: string;
    description?: string;
  };
  theme?: Theme;
  template?: string;
  slides: Slide[];
  plugins?: string[];
}

/**
 * Compiled slide output
 */
export interface CompiledSlide {
  id: string;
  html: string;
  css: string;
  metadata: Record<string, unknown>;
}

/**
 * Template registry entry
 */
export interface TemplateEntry {
  name: string;
  template: Template;
}
