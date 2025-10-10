import { readFile } from 'fs/promises';
import { DeckValidator } from '@preso/core';

export async function validateCommand(file: string) {
  try {
    console.log(`Validating deck spec: ${file}`);
    
    const content = await readFile(file, 'utf-8');
    const deckSpec = JSON.parse(content);
    
    const validator = new DeckValidator();
    const result = validator.validate(deckSpec);
    
    if (result.valid) {
      console.log('✓ Deck spec is valid');
      console.log(`  - Version: ${deckSpec.version}`);
      console.log(`  - Title: ${deckSpec.metadata.title}`);
      console.log(`  - Slides: ${deckSpec.slides.length}`);
    } else {
      console.error('✗ Deck spec validation failed:');
      result.errors?.forEach(error => {
        console.error(`  - ${error}`);
      });
      process.exit(1);
    }
  } catch (error) {
    console.error('Error validating deck spec:', error);
    process.exit(1);
  }
}
