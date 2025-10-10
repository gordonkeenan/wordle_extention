import type { Theme, ThemeVars } from './types.js';

/**
 * Utility functions for working with theme variables
 */
export class ThemeVarsHandler {
  /**
   * Merge multiple theme variable sets
   */
  static merge(...themeVars: ThemeVars[]): ThemeVars {
    const result: ThemeVars = {};

    for (const vars of themeVars) {
      for (const [category, values] of Object.entries(vars)) {
        if (!result[category]) {
          result[category] = {};
        }
        Object.assign(result[category]!, values);
      }
    }

    return result;
  }

  /**
   * Convert theme variables to CSS custom properties
   */
  static toCSS(vars: ThemeVars): string {
    const cssVars: string[] = [];

    for (const [category, values] of Object.entries(vars)) {
      if (values && typeof values === 'object') {
        for (const [key, value] of Object.entries(values)) {
          cssVars.push(`  --${category}-${key}: ${value};`);
        }
      }
    }

    return `:root {\n${cssVars.join('\n')}\n}`;
  }

  /**
   * Apply theme variables to a DOM element
   */
  static applyToElement(element: HTMLElement, vars: ThemeVars): void {
    for (const [category, values] of Object.entries(vars)) {
      if (values && typeof values === 'object') {
        for (const [key, value] of Object.entries(values)) {
          element.style.setProperty(`--${category}-${key}`, value);
        }
      }
    }
  }

  /**
   * Get a specific theme variable value
   */
  static get(vars: ThemeVars, category: string, key: string): string | undefined {
    return vars[category]?.[key];
  }

  /**
   * Set a specific theme variable value
   */
  static set(vars: ThemeVars, category: string, key: string, value: string): ThemeVars {
    const result = { ...vars };
    if (!result[category]) {
      result[category] = {};
    }
    result[category] = { ...result[category], [key]: value };
    return result;
  }

  /**
   * Create a default theme
   */
  static createDefault(name: string = 'default'): Theme {
    return {
      name,
      vars: {
        colors: {
          primary: '#6aaa64',
          secondary: '#c9b458',
          background: '#121212',
          text: '#ffffff',
          error: '#f44336',
        },
        fonts: {
          body: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          mono: 'Monaco, Consolas, "Courier New", monospace',
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '2rem',
          xl: '4rem',
        },
      },
    };
  }
}
