import { describe, it, expect } from 'vitest';
import { TemplateRegistry } from '../TemplateRegistry';
import type { Template, Slide, Theme } from '../types';

describe('TemplateRegistry', () => {
  it('should register a template', () => {
    const registry = new TemplateRegistry();
    const template: Template = {
      name: 'test',
      render: (slide: Slide, theme: Theme) => '<div>Test</div>',
    };

    registry.register('test', template);
    expect(registry.has('test')).toBe(true);
  });

  it('should get a registered template', () => {
    const registry = new TemplateRegistry();
    const template: Template = {
      name: 'test',
      render: (slide: Slide, theme: Theme) => '<div>Test</div>',
    };

    registry.register('test', template);
    const retrieved = registry.get('test');
    expect(retrieved).toBe(template);
  });

  it('should throw when registering duplicate template', () => {
    const registry = new TemplateRegistry();
    const template: Template = {
      name: 'test',
      render: (slide: Slide, theme: Theme) => '<div>Test</div>',
    };

    registry.register('test', template);
    expect(() => registry.register('test', template)).toThrow();
  });

  it('should list all templates', () => {
    const registry = new TemplateRegistry();
    const template1: Template = {
      name: 'test1',
      render: (slide: Slide, theme: Theme) => '<div>Test1</div>',
    };
    const template2: Template = {
      name: 'test2',
      render: (slide: Slide, theme: Theme) => '<div>Test2</div>',
    };

    registry.register('test1', template1);
    registry.register('test2', template2);

    const list = registry.list();
    expect(list).toHaveLength(2);
    expect(list[0].name).toBe('test1');
    expect(list[1].name).toBe('test2');
  });

  it('should unregister a template', () => {
    const registry = new TemplateRegistry();
    const template: Template = {
      name: 'test',
      render: (slide: Slide, theme: Theme) => '<div>Test</div>',
    };

    registry.register('test', template);
    expect(registry.has('test')).toBe(true);

    registry.unregister('test');
    expect(registry.has('test')).toBe(false);
  });

  it('should get all template names', () => {
    const registry = new TemplateRegistry();
    const template1: Template = {
      name: 'test1',
      render: (slide: Slide, theme: Theme) => '<div>Test1</div>',
    };
    const template2: Template = {
      name: 'test2',
      render: (slide: Slide, theme: Theme) => '<div>Test2</div>',
    };

    registry.register('test1', template1);
    registry.register('test2', template2);

    const names = registry.getNames();
    expect(names).toContain('test1');
    expect(names).toContain('test2');
    expect(names).toHaveLength(2);
  });

  it('should clear all templates', () => {
    const registry = new TemplateRegistry();
    const template: Template = {
      name: 'test',
      render: (slide: Slide, theme: Theme) => '<div>Test</div>',
    };

    registry.register('test', template);
    expect(registry.has('test')).toBe(true);

    registry.clear();
    expect(registry.has('test')).toBe(false);
    expect(registry.list()).toHaveLength(0);
  });
});
