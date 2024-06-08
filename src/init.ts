import { VirtualDirectory } from "./io";
import { ProjectContext } from "./project";
import { ConsoleColor } from "./utils";

export function GetContext(dir: VirtualDirectory) {
    const context = new ProjectContext(dir);
    return {
        context,
        loaded: context.load().catch(()=>{}).then(()=>context)
    };
}
process.on("beforeExit", ()=>console.log(ConsoleColor.RESET));