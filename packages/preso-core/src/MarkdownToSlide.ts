import { marked } from 'marked';
import type { Slide, SlideBlock, TextBlock, CodeBlock, ListBlock, ImageBlock } from './types.js';

/**
 * Parser to convert Markdown to Slide format
 */
export class MarkdownToSlide {
  /**
   * Parse markdown string into slides
   * Slides are separated by --- or horizontal rules
   */
  static parse(markdown: string): Slide[] {
    const slides: Slide[] = [];
    const slideTexts = markdown.split(/^---+$/m).map(s => s.trim()).filter(s => s.length > 0);

    for (let i = 0; i < slideTexts.length; i++) {
      const slideText = slideTexts[i];
      const slide = this.parseSlide(slideText, i);
      slides.push(slide);
    }

    return slides;
  }

  /**
   * Parse a single slide from markdown
   */
  private static parseSlide(markdown: string, index: number): Slide {
    const blocks: SlideBlock[] = [];
    let title: string | undefined;
    let id = `slide-${index + 1}`;

    // Check for frontmatter (YAML-like metadata)
    const frontmatterMatch = markdown.match(/^```yaml\n([\s\S]*?)\n```\n/);
    let metadata: Record<string, unknown> = {};
    
    if (frontmatterMatch) {
      // Simple YAML-like parsing for basic metadata
      const yamlText = frontmatterMatch[1];
      metadata = this.parseSimpleYAML(yamlText);
      markdown = markdown.substring(frontmatterMatch[0].length).trim();
      
      if (metadata.id) {
        id = String(metadata.id);
      }
      if (metadata.title) {
        title = String(metadata.title);
      }
    }

    // Parse title from first heading if not in metadata
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    if (titleMatch && !title) {
      title = titleMatch[1];
      markdown = markdown.replace(titleMatch[0], '').trim();
    }

    // Parse the markdown content into blocks
    const tokens = marked.lexer(markdown);

    for (const token of tokens) {
      const block = this.tokenToBlock(token);
      if (block) {
        blocks.push(block);
      }
    }

    return {
      id,
      title,
      blocks,
      metadata,
    };
  }

  /**
   * Convert a marked token to a SlideBlock
   */
  private static tokenToBlock(token: any): SlideBlock | null {
    switch (token.type) {
      case 'paragraph':
        return {
          type: 'text',
          content: token.text,
        } as TextBlock;

      case 'code':
        return {
          type: 'code',
          content: token.text,
          language: token.lang,
        } as CodeBlock;

      case 'list':
        return {
          type: 'list',
          items: token.items.map((item: any) => item.text),
          ordered: token.ordered,
        } as ListBlock;

      case 'image':
        return {
          type: 'image',
          src: token.href,
          alt: token.text,
        } as ImageBlock;

      case 'heading':
        return {
          type: 'text',
          content: `<h${token.depth}>${token.text}</h${token.depth}>`,
        } as TextBlock;

      default:
        return null;
    }
  }

  /**
   * Simple YAML parser for basic key-value pairs
   */
  private static parseSimpleYAML(yaml: string): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    const lines = yaml.split('\n');

    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        // Try to parse as JSON, otherwise keep as string
        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = value.trim();
        }
      }
    }

    return result;
  }

  /**
   * Convert a Slide back to markdown
   */
  static toMarkdown(slide: Slide): string {
    let markdown = '';

    // Add metadata as frontmatter
    if (slide.metadata && Object.keys(slide.metadata).length > 0) {
      markdown += '```yaml\n';
      markdown += `id: ${slide.id}\n`;
      if (slide.title) {
        markdown += `title: ${slide.title}\n`;
      }
      for (const [key, value] of Object.entries(slide.metadata)) {
        if (key !== 'id' && key !== 'title') {
          markdown += `${key}: ${JSON.stringify(value)}\n`;
        }
      }
      markdown += '```\n\n';
    }

    // Add title
    if (slide.title) {
      markdown += `# ${slide.title}\n\n`;
    }

    // Add blocks
    if (slide.blocks) {
      for (const block of slide.blocks) {
        markdown += this.blockToMarkdown(block) + '\n\n';
      }
    }

    return markdown.trim();
  }

  /**
   * Convert a SlideBlock to markdown
   */
  private static blockToMarkdown(block: SlideBlock): string {
    switch (block.type) {
      case 'text':
        return (block as TextBlock).content;

      case 'code': {
        const codeBlock = block as CodeBlock;
        return `\`\`\`${codeBlock.language || ''}\n${codeBlock.content}\n\`\`\``;
      }

      case 'list': {
        const listBlock = block as ListBlock;
        const prefix = listBlock.ordered ? '1.' : '-';
        return listBlock.items.map(item => `${prefix} ${item}`).join('\n');
      }

      case 'image': {
        const imageBlock = block as ImageBlock;
        return `![${imageBlock.alt || ''}](${imageBlock.src})`;
      }

      default:
        return '';
    }
  }
}
