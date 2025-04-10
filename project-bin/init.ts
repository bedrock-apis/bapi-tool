import picocolors from 'picocolors';
import { stdout } from 'process';

process.on('beforeExit', () => stdout.write(picocolors.reset("")));
