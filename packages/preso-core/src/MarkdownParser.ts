import { marked } from 'marked';
import type { Slide, SlideBlock } from './types.js';

/**
 * Parse markdown content into a slide
 */
export function parseMarkdownToSlide(markdown: string, id: string): Slide {
  const lines = markdown.split('\n');
  let title = '';
  let content = '';
  const meta: Record<string, any> = {};

  // Extract frontmatter if present
  let inFrontmatter = false;
  let frontmatterEnd = 0;
  
  if (lines[0] === '---') {
    inFrontmatter = true;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '---') {
        frontmatterEnd = i + 1;
        break;
      }
      // Simple key: value parsing
      const match = lines[i].match(/^(\w+):\s*(.+)$/);
      if (match) {
        meta[match[1]] = match[2];
      }
    }
  }

  // Extract title (first h1 or h2)
  const contentLines = lines.slice(frontmatterEnd);
  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i];
    const h1Match = line.match(/^#\s+(.+)$/);
    const h2Match = line.match(/^##\s+(.+)$/);
    
    if (h1Match || h2Match) {
      title = (h1Match || h2Match)![1];
      content = contentLines.slice(i + 1).join('\n');
      break;
    }
  }

  if (!title) {
    content = contentLines.join('\n');
  }

  // Parse markdown to HTML
  const htmlContent = marked(content) as string;

  // Create a simple block structure
  const blocks: SlideBlock[] = [
    {
      type: 'html',
      content: htmlContent,
    },
  ];

  return {
    id,
    title,
    blocks,
    meta: Object.keys(meta).length > 0 ? meta : undefined,
  };
}

/**
 * Parse multiple markdown slides separated by ---
 */
export function parseMarkdownSlides(markdown: string): Slide[] {
  const slides: Slide[] = [];
  const parts = markdown.split(/\n---\n/);

  parts.forEach((part, index) => {
    if (part.trim()) {
      const id = `slide-${index + 1}`;
      slides.push(parseMarkdownToSlide(part.trim(), id));
    }
  });

  return slides;
}
