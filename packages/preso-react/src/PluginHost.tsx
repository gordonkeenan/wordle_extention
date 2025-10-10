import { type ReactNode, type ComponentType } from 'react';

/**
 * Plugin registry for dynamic components
 */
const pluginRegistry = new Map<string, ComponentType<any>>();

/**
 * Register a plugin component
 */
export function registerPlugin(name: string, component: ComponentType<any>) {
  pluginRegistry.set(name, component);
}

/**
 * Get a registered plugin component
 */
export function getPlugin(name: string): ComponentType<any> | undefined {
  return pluginRegistry.get(name);
}

/**
 * PluginHost props
 */
export interface PluginHostProps {
  name: string;
  props?: Record<string, unknown>;
  fallback?: ReactNode;
}

/**
 * Component that hosts plugin modules
 */
export function PluginHost({ name, props = {}, fallback = null }: PluginHostProps) {
  const Plugin = getPlugin(name);

  if (!Plugin) {
    console.warn(`Plugin "${name}" not found in registry`);
    return <>{fallback}</>;
  }

  return (
    <div className="plugin-host" data-plugin-name={name}>
      <Plugin {...props} />
    </div>
  );
}
