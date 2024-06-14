import { program } from 'commander';
import { PhysicalDirectory } from '../io';

program.action((e) => {
    console.log(program.helpInformation());
});
Promise.resolve().then(() => program.parse(process.argv));

export const CURRENT_WORKING_DIRECTORY = new PhysicalDirectory('.');
