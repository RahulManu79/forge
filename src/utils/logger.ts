import { blue, green, yellow, red } from './chalk';

export const info = (msg: string) => console.log(blue(msg));
export const success = (msg: string) => console.log(green(msg));
export const warn = (msg: string) => console.warn(yellow(msg));
export const error = (msg: string) => console.error(red(msg));
