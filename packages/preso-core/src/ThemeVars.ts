import type { ThemeVars } from './types.js';

/**
 * Merge theme variables with defaults
 */
export function mergeTheme(base: ThemeVars, override?: ThemeVars): ThemeVars {
  if (!override) return base;

  return {
    ...base,
    ...override,
    colors: { ...base.colors, ...override.colors },
    fonts: { ...base.fonts, ...override.fonts },
    spacing: { ...base.spacing, ...override.spacing },
  };
}

/**
 * Convert theme variables to CSS custom properties
 */
export function themeToCSSVars(theme: ThemeVars, prefix = '--preso'): Record<string, string> {
  const vars: Record<string, string> = {};

  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (value) vars[`${prefix}-color-${key}`] = value;
    });
  }

  if (theme.fonts) {
    Object.entries(theme.fonts).forEach(([key, value]) => {
      if (value) vars[`${prefix}-font-${key}`] = value;
    });
  }

  if (theme.spacing) {
    Object.entries(theme.spacing).forEach(([key, value]) => {
      if (value) vars[`${prefix}-spacing-${key}`] = value;
    });
  }

  return vars;
}

/**
 * Apply theme CSS variables to an element
 */
export function applyTheme(element: HTMLElement, theme: ThemeVars, prefix = '--preso'): void {
  const vars = themeToCSSVars(theme, prefix);
  Object.entries(vars).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}
