import { stdout } from 'process';
import { ConsoleColor } from './utils';

process.on('beforeExit', () => stdout.write(ConsoleColor.RESET));
