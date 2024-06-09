import { program } from "commander";
import { PhysicalDirectory } from "../io";
import { GetContext } from "../init";

program.action((e)=>{ console.log(program.helpInformation()); });
export const context = GetContext(new PhysicalDirectory(".", null));
context.then((context)=>{
    program.parse(process.argv);
});