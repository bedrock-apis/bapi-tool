import "./init";
import { createCommand } from 'commander';
import scanCommand from "./scan";

export const program = createCommand('bapi').addCommand(scanCommand).parse();