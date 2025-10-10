/**
 * @preso/react - React components for presentations
 */

// Export components
export { PresoRoot, type PresoRootProps } from './PresoRoot.js';
export { SlideHost, type SlideHostProps } from './SlideHost.js';
export { TemplateHost, type TemplateHostProps } from './TemplateHost.js';
export { 
  PluginHost, 
  type PluginHostProps,
  registerPlugin,
  getPlugin 
} from './PluginHost.js';

// Export hooks
export { 
  useTheme, 
  ThemeProvider, 
  type ThemeProviderProps 
} from './useTheme.js';
