import { createCommand } from 'commander';
import { scanSubcommand } from './scan';

const program = createCommand('bapi').addCommand(scanSubcommand).parse();
