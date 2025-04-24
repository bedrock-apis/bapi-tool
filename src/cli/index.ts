import { createCommand } from 'commander';
import { scanSubcommand } from './scan';

createCommand('bapi').addCommand(scanSubcommand).parse();
