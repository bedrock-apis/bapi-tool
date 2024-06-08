import { program } from "commander";
import { VirtualDirectory } from "../io";
import { ProjectConfig, CONFIG_VALIDATOR } from "./config";
import { Program } from "./project-command";

export class ProjectContext{
    public readonly base: VirtualDirectory;
    public readonly config;
    public readonly forcedConfig;
    public readonly projectCommands = new Program(this, program);
    constructor(base: VirtualDirectory, forcedConfig = true){
        this.base = base;
        this.forcedConfig = forcedConfig;
        this.config = new ProjectConfig(base.openFile("config.json"));
    }
    async load(){
        await this.config.load();
        this.validateConfig();
    }
    validateConfig(){ CONFIG_VALIDATOR.validate(this.config.rawObject, "ROOT"); }
}