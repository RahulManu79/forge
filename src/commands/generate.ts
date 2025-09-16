import path from 'path';
import fs from 'fs/promises';
import Handlebars from 'handlebars';
import { kebabCase, pascalCase } from '../utils/casing';
import { ensureDir, writeFileIfNotExists } from '../utils/fs';
import { green, yellow, red } from '../utils/chalk';
import config from '../config';

type GenType = 'module' | 'service' | 'controller' | 'resource';

async function renderTemplate(templatePath: string, context: Record<string, string>) {
  const tpl = await fs.readFile(templatePath, 'utf-8');
  const compiler = Handlebars.compile(tpl);
  return compiler(context);
}

export async function generate(
  type: string,
  name: string,
  opts: { dir?: string; interactive?: boolean } = {},
) {
  const t = type.toLowerCase() as GenType;
  // Per requirements: always prompt the user for destination path (Default or Custom)
  const Name = pascalCase(name);
  const filename = kebabCase(name);

  if (t === 'resource') {
    // create module, service, controller in parallel
    await Promise.all([
      generate('module', name, opts),
      generate('service', name, opts),
      generate('controller', name, opts),
    ]);
    console.log(green(`Resource ${Name} generated.`));
    return;
  }

  // inquirer is distributed as an ES module. When compiling to CommonJS,
  // TypeScript sometimes emits a require() which fails at runtime.
  // To force a runtime dynamic import (available for ESM packages) we
  // use eval('import(...)') which avoids TypeScript compiling it to require().
  // This returns a Promise resolving to the module namespace.
  // eslint-disable-next-line no-eval
  const inquirerMod: any = await eval('import("inquirer")');
  const inquirerLib: any = inquirerMod.default || inquirerMod;
  const pathAnswers = await inquirerLib.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Where do you want to generate the module?',
      choices: [
        { name: 'Default (src/)', value: 'default' },
        { name: 'Custom Path', value: 'custom' },
      ],
      default: 'default',
    },
    {
      type: 'input',
      name: 'customPath',
      message: 'Enter custom destination path (relative to project root)',
      when: (answers: any) => answers.choice === 'custom',
      default: 'src/modules',
    },
  ]);

  const target = pathAnswers.choice === 'default' ? 'src' : pathAnswers.customPath || 'src';

  const templatesDir = path.resolve(__dirname, '..', 'templates');
  const candidates = [
    path.join(templatesDir, `${t}.ts.hbs`), // bundled templates
    path.join(process.cwd(), 'src', 'templates', `${t}.ts.hbs`), // project source
    path.join(process.cwd(), 'templates', `${t}.ts.hbs`), // project root templates
  ];

  let tplPath: string | null = null;
  for (const c of candidates) {
    try {
      await fs.access(c);
      tplPath = c;
      break;
    } catch (_) {
      // continue
    }
  }

  if (!tplPath) {
    console.error(red('Template not found:'), candidates.join(' | '));
    return;
  }

  const content = await renderTemplate(tplPath, { Name, name: filename });

  const outDir = path.join(process.cwd(), target, `${filename}`);

  // If the target folder already exists, warn and skip generation
  try {
    await fs.access(outDir);
    console.warn(yellow(`Target folder ${outDir} already exists  — skipping generation.`));
    return;
  } catch {
    // does not exist -> continue
  }

  await ensureDir(outDir);

  // If generating a module, produce controller, service, routes, and validation
  if (t === 'module') {
    const files = [
      { tpl: 'controller', out: `${filename}.controller.ts` },
      { tpl: 'service', out: `${filename}.service.ts` },
      { tpl: 'routes', out: `${filename}.routes.ts` },
      { tpl: 'validation', out: `${filename}.validation.ts` },
    ];

    for (const f of files) {
      // find template for this file
      let tpl: string | null = null;
      const cand = [
        path.join(__dirname, '..', 'templates', `${f.tpl}.ts.hbs`),
        path.join(process.cwd(), 'src', 'templates', `${f.tpl}.ts.hbs`),
        path.join(process.cwd(), 'templates', `${f.tpl}.ts.hbs`),
      ];
      for (const c of cand) {
        try {
          await fs.access(c);
          tpl = c;
          break;
        } catch (_) {}
      }
      if (!tpl) {
        console.warn(yellow(`Template for ${f.tpl} not found, skipping ${f.out}`));
        continue;
      }
      const content = await renderTemplate(tpl, { Name, name: filename });
      const outFile = path.join(outDir, f.out);
      const written = await writeFileIfNotExists(outFile, content);
      if (!written) {
        console.warn(yellow(`Skipped ${outFile} — already exists.`));
      } else {
        console.log(green(`Created ${outFile}`));
      }
    }
    return;
  }
}
