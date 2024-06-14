import { VirtualEntryType } from '../virtual-entry-type';
import type { VirtualDirectory } from './virtual-directory';

/**
 * Virtual Entry class, this class should be inherited by VirtualFile or VirtualDirectory only,
 * there are no other types then file and directory.
 */
export abstract class VirtualEntry<T extends VirtualEntryType> {
    /**
     * File or directory
     */
    public abstract readonly type: T;
    /**
     * Base directory, may be a null.
     */
    public abstract getBaseDirectory(): VirtualDirectory;
    /**
     * Name only without relative path.
     */
    public abstract readonly name: string;
    /**
     * Relative Path
     */
    public abstract readonly fullPath: string;
    /**
     * If file or directory is no longer reachable then this should return false
     */
    public abstract isValid(): Promise<boolean>;

    /**
     * Deletes this entry (file/directory) and returns if the deletion success.
     */
    public abstract delete(): Promise<boolean>;

    /**
     * @returns Makes sure this entry exists
     */
    public abstract create(): Promise<this>;
    public toString() {
        return this.fullPath;
    }
}
