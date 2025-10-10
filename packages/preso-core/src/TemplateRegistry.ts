import type { Template, TemplateEntry } from './types.js';

/**
 * Registry for managing presentation templates
 */
export class TemplateRegistry {
  private templates: Map<string, Template> = new Map();

  /**
   * Register a new template
   */
  register(name: string, template: Template): void {
    if (this.templates.has(name)) {
      throw new Error(`Template "${name}" is already registered`);
    }
    this.templates.set(name, template);
  }

  /**
   * Get a template by name
   */
  get(name: string): Template | undefined {
    return this.templates.get(name);
  }

  /**
   * Check if a template exists
   */
  has(name: string): boolean {
    return this.templates.has(name);
  }

  /**
   * Remove a template from the registry
   */
  unregister(name: string): boolean {
    return this.templates.delete(name);
  }

  /**
   * List all registered templates
   */
  list(): TemplateEntry[] {
    return Array.from(this.templates.entries()).map(([name, template]) => ({
      name,
      template,
    }));
  }

  /**
   * Get all template names
   */
  getNames(): string[] {
    return Array.from(this.templates.keys());
  }

  /**
   * Clear all templates
   */
  clear(): void {
    this.templates.clear();
  }
}

// Singleton instance
export const templateRegistry = new TemplateRegistry();
