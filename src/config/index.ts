import path from 'path';
import fs from 'fs';

const root = process.cwd();
let userConfig: Record<string, any> = {};
const configPath = path.join(root, 'forge.config.json');
if (fs.existsSync(configPath)) {
  try {
    userConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch {
    userConfig = {};
  }
}

export default {
  templatesDir: path.join(__dirname, '..', 'templates'),
  templateExt: '.hbs',
  projectRoot: root,
  outputPath: userConfig.outputPath || 'src',
  namingConvention: userConfig.namingConvention || 'PascalCase',
};
