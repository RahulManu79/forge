#!/usr/bin/env node
import { Command } from 'commander';
import { red, green } from './utils/chalk';
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
  .option('--dry-run', 'preview changes without writing files')
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

program
  .command('new <project>')
  .description('create a new Node.js/TypeScript project boilerplate')
  .action(async (project: string) => {
    try {
      const loader = await import('./commands/generate');
      await loader.generate('project', project, {});
      console.log(green(`Project '${project}' created.`));
    } catch (err: any) {
      const msg = red('Failed to create project:');
      console.error(msg, err.message || err);
      process.exit(1);
    }
  });

// Interactive mode if no args
if (process.argv.length <= 2) {
  (async () => {
    // Dynamic import inquirer
    // eslint-disable-next-line no-eval
    const inquirerMod: any = await eval('import("inquirer")');
    const inquirer: any = inquirerMod.default || inquirerMod;
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What would you like to generate?',
        choices: [
          { name: 'Controller', value: 'controller' },
          { name: 'Service', value: 'service' },
          { name: 'Module', value: 'module' },
          { name: 'Project', value: 'project' },
        ],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
        validate: (input: string) => (input ? true : 'Name is required'),
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Destination path (default: current directory):',
        default: process.cwd(),
      },
    ]);
    try {
      const loader = await import('./commands/generate');
      await loader.generate(answers.type, answers.name, { dir: answers.dir, interactive: true });
      console.log(
        green(
          `${answers.type === 'project' ? 'Project' : 'Resource'} '${answers.name}' generated.`,
        ),
      );
    } catch (err: any) {
      const msg = red('Failed to run interactive command:');
      console.error(msg, err.message || err);
      process.exit(1);
    }
  })();
} else {
  program.parse(process.argv);
}
