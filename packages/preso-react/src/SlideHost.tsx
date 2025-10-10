import { type ReactNode } from 'react';
import type { Slide } from '@preso/core';

/**
 * SlideHost props
 */
export interface SlideHostProps {
  slide: Slide;
  children?: ReactNode;
  className?: string;
}

/**
 * Component that hosts a single slide with metadata
 */
export function SlideHost({ slide, children, className = '' }: SlideHostProps) {
  return (
    <div 
      className={`slide-host ${className}`}
      data-slide-id={slide.id}
      data-slide-title={slide.title}
    >
      {slide.title && (
        <div className="slide-title">
          <h1>{slide.title}</h1>
        </div>
      )}
      <div className="slide-content">
        {children}
      </div>
      {slide.notes && slide.notes.length > 0 && (
        <div className="slide-notes" style={{ display: 'none' }}>
          {slide.notes.map((note, index) => (
            <p key={index}>{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}
