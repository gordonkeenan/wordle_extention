import React from 'react';
import type { CompiledSlide } from '@preso/core';
import { TemplateHost } from './TemplateHost.js';

export interface SlideHostProps {
  compiledSlide: CompiledSlide;
}

export function SlideHost({ compiledSlide }: SlideHostProps) {
  const { slide, template } = compiledSlide;

  return (
    <div className="preso-slide" data-slide-id={slide.id}>
      {slide.title && (
        <header className="preso-slide-header">
          <h1 className="preso-slide-title">{slide.title}</h1>
        </header>
      )}
      <div className="preso-slide-content">
        <TemplateHost slide={slide} template={template} />
      </div>
      {slide.meta?.notes && (
        <div className="preso-slide-notes" style={{ display: 'none' }}>
          {slide.meta.notes.map((note: string, i: number) => (
            <p key={i}>{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}
