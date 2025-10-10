#!/usr/bin/env node
import { Command } from 'commander';
import { validateCommand } from './commands/validate.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('preso')
  .description('CLI tool for presentation management')
  .version('0.1.0');

// Validate command
program
  .command('validate')
  .description('Validate a deck specification file')
  .argument('<file>', 'Path to deck spec JSON file')
  .action(validateCommand);

// List command
program
  .command('list')
  .description('List templates or plugins')
  .argument('<type>', 'Type to list (templates|plugins)')
  .action(listCommand);

program.parse();
