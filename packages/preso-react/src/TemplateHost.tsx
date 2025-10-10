import React from 'react';
import type { Slide, Template, ThemeVars } from '@preso/core';
import { useTheme } from './useTheme.js';

export interface TemplateHostProps {
  slide: Slide;
  template: Template;
}

export function TemplateHost({ slide, template }: TemplateHostProps) {
  const { theme } = useTheme();

  try {
    const rendered = template.render(slide, theme);

    // If the template returns a string (HTML), render it
    if (typeof rendered === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: rendered }} />;
    }

    // If the template returns a React element, render it directly
    return <>{rendered}</>;
  } catch (error) {
    console.error('Error rendering template:', error);
    return (
      <div className="preso-template-error">
        <p>Error rendering slide template</p>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </div>
    );
  }
}
