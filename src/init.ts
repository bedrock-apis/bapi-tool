import { VirtualDirectory } from "./io";
import { ProjectContext } from "./project";
import { ConsoleColor } from "./utils";

export function GetContext(dir: VirtualDirectory) { return ProjectContext.OpenProject(dir); }
process.on("beforeExit", ()=>console.log(ConsoleColor.RESET));