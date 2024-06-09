import { ProjectConfig } from "../../src/project/config/project-config";
import { ExtendableClasses } from "./EXTENDABLE_CLASSES";
import { Plugin } from "./plugin";

export class PluginManager{
    public readonly plugins = new Set<Plugin>();
    public constructor(){}
    public registry(instance: Plugin){ this.plugins.add(instance); }
    public getExtendableClasses(): ExtendableClasses{ return {}; }
}
export const PLUGIN_MANAGER = new PluginManager();