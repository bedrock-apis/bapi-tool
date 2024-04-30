import type { VirtualDirectory } from "./virtual-directory";

export enum VirtualEntryType{
    "Directory" = "Directory",
    "File" = "File"
}

export abstract class VirtualEntry<T extends VirtualEntryType>{
    public abstract readonly type: T;
    public abstract readonly directory: VirtualDirectory | null;
    public abstract readonly name: string;
    public abstract readonly relativePath: string;
    public abstract getExist(): Promise<boolean>;
}