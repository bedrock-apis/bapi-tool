import { VirtualEntryType } from "../virtual-entry-type";
import type { VirtualDirectory } from "./virtual-directory";

/**
 * Virtual Entry class, this class should be inherited by VirtualFile or VirtualDirectory only, 
 * there are no other types then file and directory.
 */
export abstract class VirtualEntry<T extends VirtualEntryType, Nullable extends boolean = true>{
    /**
     * File or directory
     */
    public abstract readonly type: T;
    /**
     * Base directory, may be a null.
     */
    public abstract readonly directory: Nullable extends true ? VirtualDirectory | null : VirtualDirectory;
    /**
     * Name only without relative path.
     */
    public abstract readonly name: string;
    /**
     * Relative Path
     */
    public abstract readonly relativePath: string;
    /**
     * If file or directory is no longer reachable then this should return false
     */
    public abstract isValid(): Promise<boolean>;
}