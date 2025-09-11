#!/usr/bin/env node
import { Command } from 'commander';
import { red } from './utils/chalk';
import { version } from '../package.json';

const program = new Command();

program
  .name('forge')
  .version(version)
  .description('Forge CLI - lightweight NestJS-like scaffolder');

program
  .command('g <type> <name>')
  .description('generate a resource (module|service|controller|resource)')
  .option('-d, --dir <dir>', 'target directory', 'src')
  .action(async (type: string, name: string, opts: any) => {
    try {
      const loader = await import('./commands/generate');
      await loader.generate(type, name, opts);
    } catch (err: any) {
      const msg = red('Failed to run command:');
      console.error(msg, err.message || err);
      process.exit(1);
    }
  });

program.parse(process.argv);
