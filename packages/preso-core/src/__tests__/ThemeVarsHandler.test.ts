import { describe, it, expect } from 'vitest';
import { ThemeVarsHandler } from '../ThemeVarsHandler';
import type { ThemeVars } from '../types';

describe('ThemeVarsHandler', () => {
  it('should merge theme variables', () => {
    const vars1: ThemeVars = {
      colors: {
        primary: '#000',
      },
    };
    const vars2: ThemeVars = {
      colors: {
        secondary: '#fff',
      },
    };

    const merged = ThemeVarsHandler.merge(vars1, vars2);
    expect(merged.colors?.primary).toBe('#000');
    expect(merged.colors?.secondary).toBe('#fff');
  });

  it('should override values when merging', () => {
    const vars1: ThemeVars = {
      colors: {
        primary: '#000',
      },
    };
    const vars2: ThemeVars = {
      colors: {
        primary: '#fff',
      },
    };

    const merged = ThemeVarsHandler.merge(vars1, vars2);
    expect(merged.colors?.primary).toBe('#fff');
  });

  it('should convert theme vars to CSS', () => {
    const vars: ThemeVars = {
      colors: {
        primary: '#000',
        secondary: '#fff',
      },
    };

    const css = ThemeVarsHandler.toCSS(vars);
    expect(css).toContain('--colors-primary: #000;');
    expect(css).toContain('--colors-secondary: #fff;');
  });

  it('should get a specific theme variable', () => {
    const vars: ThemeVars = {
      colors: {
        primary: '#000',
      },
    };

    const value = ThemeVarsHandler.get(vars, 'colors', 'primary');
    expect(value).toBe('#000');
  });

  it('should return undefined for non-existent variable', () => {
    const vars: ThemeVars = {
      colors: {
        primary: '#000',
      },
    };

    const value = ThemeVarsHandler.get(vars, 'colors', 'nonexistent');
    expect(value).toBeUndefined();
  });

  it('should set a theme variable', () => {
    const vars: ThemeVars = {
      colors: {
        primary: '#000',
      },
    };

    const newVars = ThemeVarsHandler.set(vars, 'colors', 'secondary', '#fff');
    expect(newVars.colors?.secondary).toBe('#fff');
    expect(newVars.colors?.primary).toBe('#000');
  });

  it('should create a default theme', () => {
    const theme = ThemeVarsHandler.createDefault('test');
    expect(theme.name).toBe('test');
    expect(theme.vars.colors).toBeDefined();
    expect(theme.vars.fonts).toBeDefined();
    expect(theme.vars.spacing).toBeDefined();
  });

  it('should create a default theme with default name', () => {
    const theme = ThemeVarsHandler.createDefault();
    expect(theme.name).toBe('default');
  });
});
