import type { Template, Slide, Theme } from '@preso/core';

/**
 * Clean template - minimal, focused layout
 * Based on the existing Wordle presentation design
 */
export const cleanTemplate: Template = {
  name: 'clean',
  render: (slide: Slide, theme: Theme) => {
    const tracker = Array.isArray(slide.tracker) 
      ? slide.tracker.join(' / ') 
      : slide.tracker || '';

    const renderTracker = (word: string) => {
      if (!word) return '';
      
      const tiles = word.split('').map((letter, i) => {
        // Cycle through wordle colors for visual variety
        const colors = ['green', 'yellow', 'gray'];
        const color = colors[i % colors.length];
        return `<div class="wordle-tile wordle-${color}">${letter}</div>`;
      }).join('');

      return `<div class="wordle-tracker">${tiles}</div>`;
    };

    let html = '<div class="slide-clean">';
    
    // Add tracker if present
    if (tracker) {
      html += `<div class="slide-tracker">${renderTracker(tracker)}</div>`;
    }

    // Add title
    if (slide.title) {
      html += `<h1 class="slide-title">${slide.title}</h1>`;
    }

    // Add content blocks
    if (slide.blocks && slide.blocks.length > 0) {
      html += '<div class="slide-content">';
      
      for (const block of slide.blocks) {
        switch (block.type) {
          case 'text':
            html += `<div class="text-block">${(block as any).content}</div>`;
            break;
          case 'code':
            html += `<pre class="code-block"><code>${(block as any).content}</code></pre>`;
            break;
          case 'list': {
            const listBlock = block as any;
            const tag = listBlock.ordered ? 'ol' : 'ul';
            html += `<${tag} class="list-block">`;
            listBlock.items.forEach((item: string) => {
              html += `<li>${item}</li>`;
            });
            html += `</${tag}>`;
            break;
          }
          case 'image':
            html += `<img class="image-block" src="${(block as any).src}" alt="${(block as any).alt || ''}" />`;
            break;
          case 'module':
            // Module blocks will be handled by React components
            html += `<div class="module-placeholder" data-module="${(block as any).moduleName}"></div>`;
            break;
        }
      }
      
      html += '</div>';
    }

    html += '</div>';

    return html;
  },
  metadata: {
    description: 'Clean, minimal template based on the Wordle presentation',
    author: 'Preso Team',
    version: '1.0.0',
  },
};
