import type { Slide, Theme, Template, CompiledSlide } from './types.js';
import { templateRegistry } from './TemplateRegistry.js';

/**
 * Compiles slides using templates and themes
 */
export class SlideCompiler {
  private defaultTemplate?: Template;

  constructor(defaultTemplate?: Template) {
    this.defaultTemplate = defaultTemplate;
  }

  /**
   * Set the default template
   */
  setDefaultTemplate(template: Template): void {
    this.defaultTemplate = template;
  }

  /**
   * Compile a single slide
   */
  compile(slide: Slide, theme: Theme, templateName?: string): CompiledSlide {
    // Resolve template
    let template: Template | undefined;
    
    if (templateName) {
      template = templateRegistry.get(templateName);
      if (!template) {
        throw new Error(`Template "${templateName}" not found in registry`);
      }
    } else if (slide.template) {
      template = templateRegistry.get(slide.template);
      if (!template) {
        throw new Error(`Template "${slide.template}" not found in registry`);
      }
    } else {
      template = this.defaultTemplate;
    }

    if (!template) {
      throw new Error('No template specified and no default template set');
    }

    // Render the slide
    const html = template.render(slide, theme);

    // Generate CSS from theme
    const css = this.generateThemeCSS(theme);

    return {
      id: slide.id,
      html,
      css,
      metadata: slide.metadata || {},
    };
  }

  /**
   * Compile multiple slides
   */
  compileAll(slides: Slide[], theme: Theme, templateName?: string): CompiledSlide[] {
    return slides.map(slide => this.compile(slide, theme, templateName));
  }

  /**
   * Generate CSS from theme variables
   */
  private generateThemeCSS(theme: Theme): string {
    const cssVars: string[] = [];

    // Convert theme variables to CSS custom properties
    for (const [category, vars] of Object.entries(theme.vars)) {
      if (vars && typeof vars === 'object') {
        for (const [key, value] of Object.entries(vars)) {
          cssVars.push(`--${category}-${key}: ${value};`);
        }
      }
    }

    let css = `:root {\n  ${cssVars.join('\n  ')}\n}`;

    // Add CSS overrides if present
    if (theme.cssOverrides) {
      css += '\n\n' + theme.cssOverrides;
    }

    return css;
  }
}
