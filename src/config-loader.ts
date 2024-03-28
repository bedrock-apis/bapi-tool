import { readFileSync } from "fs";
import path from "path";
import Path from "path";

export function LoadConfig(cwd: string, configData: any){
    const {name = "", version = "", author = "", bapi = null} = configData;
    if(bapi == null) return new LoadError("This config is not create by BAPI, missing BAPI properties.");
    return {} as any;
}
export function ParseLazyJSON(data: string){
    try {
        return eval(`(\n${data}\n)`);
    } catch (error) {
        return new LoadError("json is corrupted.");
    }
}
export function GetConfig(path: string){
    const lazy = ParseLazyJSON(readFileSync(path).toString("utf8"));
    if(lazy instanceof LoadError) return lazy;
    return LoadConfig(Path.dirname(path), lazy);
}
export class LoadError extends Error{}

export interface InitializationTask {
    name: string;
    default?: string;
    task: (config: Config, value: string)=>Config;
}
export interface BAPIConfig{
    behavior_packs?: string;
    resource_packs?: string;
}
export class Config{
    static readonly initTasks: InitializationTask[] = [];
    name: string;
    version: string;
    description?: string;
    author?: string;
    "bapi-tool": BAPIConfig;
    setName(name: string){ this.name = name; return this; }
    setVersion(version: string){ this.version = version; return this; }
    setDescription(desc: string){ this.description = desc; return this; }
    setAuthor(author: string){ this.author = author; return this; }
    constructor(){
        this["bapi-tool"] = {};
    }
    setBehaviorPacks(p: string){this["bapi-tool"].behavior_packs = p; return this;}
    setResourcePacks(p: string){this["bapi-tool"].resource_packs = p; return this;}
}
Config.initTasks.push({
    name: "Name",
    get default(){return path.basename(path.resolve("."))},
    task(c,n){return c.setName(n);}
});
Config.initTasks.push({
    name: "Version",
    default: "0.1.0",
    task(c,n){return c.setVersion(n);}
});
Config.initTasks.push({
    name: "Author",
    task(c,n){return c.setAuthor(n);}
});
Config.initTasks.push({
    name: "Behavior Packs",
    default: "./behavior_packs",
    task(c,n){return c.setBehaviorPacks(n);}
});
Config.initTasks.push({
    name: "Resource Packs",
    default: "./rsouece_packs",
    task(c,n){return c.setResourcePacks(n);}
});