import { program } from "commander";
import { PhysicalDirectory } from "../io";
import { GetContext } from "../init";
import { ProjectContext } from "../project";

program.action((e)=>{ console.log(program.helpInformation()); });
export const context = GetContext(new PhysicalDirectory(".", null));
context.then((context)=>{
    ProjectContext.SetCLIFor(context, ()=>program.parse(process.argv));
    return context;
}).then(context=>context.executeCLI());