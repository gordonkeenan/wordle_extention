import { createContext, useContext, type ReactNode } from 'react';
import type { Theme } from '@preso/core';

/**
 * Theme context
 */
export const ThemeContext = createContext<Theme | null>(null);

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

/**
 * Theme provider component
 */
export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current theme
 */
export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
}
