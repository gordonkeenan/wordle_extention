import { describe, it, expect, beforeEach } from 'vitest';
import { TemplateRegistry } from '../src/TemplateRegistry';
import type { Template } from '../src/types';

describe('TemplateRegistry', () => {
  let registry: TemplateRegistry;

  beforeEach(() => {
    registry = new TemplateRegistry();
  });

  it('should register a template', () => {
    const template: Template = {
      name: 'test',
      render: () => 'test',
    };

    registry.register('test', template);
    expect(registry.has('test')).toBe(true);
  });

  it('should retrieve a registered template', () => {
    const template: Template = {
      name: 'test',
      render: () => 'test',
    };

    registry.register('test', template);
    const retrieved = registry.get('test');
    expect(retrieved).toBe(template);
  });

  it('should throw when registering duplicate template', () => {
    const template: Template = {
      name: 'test',
      render: () => 'test',
    };

    registry.register('test', template);
    expect(() => registry.register('test', template)).toThrow('already registered');
  });

  it('should list all template names', () => {
    const template1: Template = {
      name: 'test1',
      render: () => 'test1',
    };
    const template2: Template = {
      name: 'test2',
      render: () => 'test2',
    };

    registry.register('test1', template1);
    registry.register('test2', template2);

    const names = registry.list();
    expect(names).toContain('test1');
    expect(names).toContain('test2');
    expect(names.length).toBe(2);
  });

  it('should unregister a template', () => {
    const template: Template = {
      name: 'test',
      render: () => 'test',
    };

    registry.register('test', template);
    expect(registry.has('test')).toBe(true);

    registry.unregister('test');
    expect(registry.has('test')).toBe(false);
  });

  it('should clear all templates', () => {
    const template1: Template = {
      name: 'test1',
      render: () => 'test1',
    };
    const template2: Template = {
      name: 'test2',
      render: () => 'test2',
    };

    registry.register('test1', template1);
    registry.register('test2', template2);
    expect(registry.list().length).toBe(2);

    registry.clear();
    expect(registry.list().length).toBe(0);
  });
});
