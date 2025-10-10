import { type ReactNode } from 'react';
import type { Slide, Theme } from '@preso/core';

/**
 * TemplateHost props
 */
export interface TemplateHostProps {
  slide: Slide;
  theme: Theme;
  renderSlide: (slide: Slide, theme: Theme) => ReactNode;
}

/**
 * Component that hosts and renders slide templates
 */
export function TemplateHost({ slide, theme, renderSlide }: TemplateHostProps) {
  return (
    <div className="template-host" data-slide-id={slide.id}>
      {renderSlide(slide, theme)}
    </div>
  );
}
