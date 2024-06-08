import { VirtualEntryType } from "../../enums";
import type { VirtualDirectory } from "./virtual-directory";

export abstract class VirtualEntry<T extends VirtualEntryType, Nullable extends boolean = true>{
    public abstract readonly type: T;
    public abstract readonly directory: Nullable extends true ? VirtualDirectory | null : VirtualDirectory;
    public abstract readonly name: string;
    public abstract readonly relativePath: string;
    public abstract getExist(): Promise<boolean>;
}