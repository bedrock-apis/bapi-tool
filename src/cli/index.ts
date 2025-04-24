import { createCommand } from 'commander';
import { scanSubcommand } from './scan';

export const program = createCommand('bapi').addCommand(scanSubcommand).parse();
