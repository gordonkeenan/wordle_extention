import type { Template, TemplateRegistry as ITemplateRegistry } from './types.js';

/**
 * Implementation of the template registry
 */
export class TemplateRegistry implements ITemplateRegistry {
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
   * List all registered template names
   */
  list(): string[] {
    return Array.from(this.templates.keys());
  }

  /**
   * Check if a template exists
   */
  has(name: string): boolean {
    return this.templates.has(name);
  }

  /**
   * Unregister a template
   */
  unregister(name: string): boolean {
    return this.templates.delete(name);
  }

  /**
   * Clear all templates
   */
  clear(): void {
    this.templates.clear();
  }
}
