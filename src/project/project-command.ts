import { program as app, Command as CMD } from "commander";
import { ProjectContext } from ".";
import { BAPI_DESCRIPTION, BAPI_VERSION } from "../consts";

export class Program{
    protected readonly kernel: CMD;
    protected readonly plugins: CMD;
    protected readonly commandCallbacks = new Map<string, {
        callback:(project: ProjectContext, command: CMD, ...params: any[])=>(Promise<void> | void),
        cmd: CMD
    }>();
    protected readonly context;
    constructor(context: ProjectContext, cmd: CMD){
        this.kernel = cmd;
        this.kernel.version(BAPI_VERSION);
        this.kernel.description(BAPI_DESCRIPTION);
        this.plugins = cmd.command("run <plugin-subcommand>");
        this.plugins.description("Subcommands specified by");
        this.context = context;
    }
    public getHelpInformation(){return this.kernel.helpInformation();}
    public registryCommand(commandName: string, builder: (cmd: CMD)=>void){
        const cmd = this.kernel.command(commandName);
        builder(cmd);
        return this;
    }
    public registryPluginCommand(commandName: string, callback: (project: ProjectContext, command: CMD, ...params: any[])=>(Promise<void> | void)){
        const cmd = this.plugins.command(commandName);
        this.commandCallbacks.set(commandName, {callback, cmd});
        cmd.action((...any)=>this.callPluginCommand(commandName, this.context, ...any))
        return cmd;
    }
    public callPluginCommand(commandName: string, project: ProjectContext, ...args: any[]){
        const cmd = this.commandCallbacks.get(commandName);
        if(!cmd) throw new ReferenceError("Unknow command: " + commandName);
        cmd.callback(project, cmd.cmd, ...args);
    }
}