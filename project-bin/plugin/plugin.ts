import { ProjectContext } from "../../src/project/project-context";
import { ExtendableClasses } from "./EXTENDABLE_CLASSES";
import { PLUGIN_MANAGER } from "./plugin-manager";

export abstract class Plugin{
    public static getPlugable<T extends keyof ExtendableClasses>(key: T): ExtendableClasses[T]{ return PLUGIN_MANAGER.getExtendableClasses()[key]; }
    public constructor(){}
    public registry(){ PLUGIN_MANAGER.registry(this); }
    public abstract onLoad(context: ProjectContext): void;
}