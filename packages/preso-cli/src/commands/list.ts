import { templateRegistry } from '@preso/core';

export async function listCommand(type: string) {
  try {
    switch (type) {
      case 'templates':
        console.log('Available templates:');
        const templates = templateRegistry.list();
        if (templates.length === 0) {
          console.log('  (no templates registered)');
        } else {
          templates.forEach(({ name, template }) => {
            console.log(`  - ${name}`);
            if (template.metadata?.description) {
              console.log(`    ${template.metadata.description}`);
            }
          });
        }
        break;

      case 'plugins':
        console.log('Available plugins:');
        console.log('  (plugin listing not yet implemented)');
        break;

      default:
        console.error(`Unknown type: ${type}`);
        console.error('Valid types: templates, plugins');
        process.exit(1);
    }
  } catch (error) {
    console.error('Error listing:', error);
    process.exit(1);
  }
}
