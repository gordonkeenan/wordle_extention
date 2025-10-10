import React, { createContext, useContext, useMemo } from 'react';
import type { ThemeVars } from '@preso/core';
import { themeToCSSVars } from '@preso/core';

interface ThemeContextValue {
  theme: ThemeVars;
  cssVars: Record<string, string>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  theme: ThemeVars;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const value = useMemo(() => {
    return {
      theme,
      cssVars: themeToCSSVars(theme),
    };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
