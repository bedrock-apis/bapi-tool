import { program } from "commander";
import { VirtualDirectory } from "../io";
import { ProjectConfig, CONFIG_VALIDATOR } from "./config";
import { Program } from "./project-command";

export class ProjectContext{
    protected _config: ProjectConfig;
    public readonly workingDirectory: VirtualDirectory;
    public get config(){return this._config};
    public readonly projectCommands = new Program(this, program);
    /**
     * @param base working directory
     */
    private constructor(base: VirtualDirectory){
        this.workingDirectory = base;
        this._config = null as any;
    }
    /**
     * 
     * @param base Project's working directory
     * @returns Promise with new ProjectContext instance
     */
    public static async OpenProject(base: VirtualDirectory){
        const context = new ProjectContext(base);
        const file = await base.getFile("config.json");
        if(file == null) throw new ReferenceError("Faild to get file from virtual directory called 'config.json'");
        context._config = new ProjectConfig(file);
        await context._config.load();
        context.validateConfig();
        return context;
    }
    validateConfig(){ CONFIG_VALIDATOR.validate(this.config.rawObject, "ROOT"); }
}