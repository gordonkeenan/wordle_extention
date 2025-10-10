/**
 * @preso/core - Core presentation engine
 */

// Export types
export type {
  SlideBlock,
  TextBlock,
  CodeBlock,
  ImageBlock,
  ListBlock,
  ModuleBlock,
  Slide,
  ThemeVars,
  Theme,
  Template,
  PluginModule,
  DeckSpec,
  CompiledSlide,
  TemplateEntry,
} from './types.js';

// Export classes
export { TemplateRegistry, templateRegistry } from './TemplateRegistry.js';
export { SlideCompiler } from './SlideCompiler.js';
export { ThemeVarsHandler } from './ThemeVarsHandler.js';
export { MarkdownToSlide } from './MarkdownToSlide.js';
export { DeckValidator, deckValidator } from './DeckValidator.js';
