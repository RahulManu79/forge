import path from 'path';

const root = process.cwd();

export default {
  templatesDir: path.join(__dirname, '..', 'templates'),
  templateExt: '.hbs',
  projectRoot: root,
};
