// Synchronous color helpers using 'kleur' (CommonJS-friendly)
// Simple wrapper around chalk v4 for color helpers (CommonJS friendly)
import chalk from 'chalk';

export const red = (s: string) => chalk.red(s);
export const green = (s: string) => chalk.green(s);
export const blue = (s: string) => chalk.blue(s);
export const yellow = (s: string) => chalk.yellow(s);

export default { red, green, blue, yellow };
