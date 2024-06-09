import { VirtualEntryType } from "../virtual-entry-type";
import { VirtualEntry } from "./virtual-entry";
import { VirtualFile } from "./virtual-file";

export abstract class VirtualDirectory<Nullable extends boolean = true> extends VirtualEntry<VirtualEntryType.Directory, Nullable>{
    /**
     * @inheritdoc
     * Directory
     */
    public readonly type = VirtualEntryType.Directory;
    /**
     * Get all files and directories from this folder
     * @param recursive if true, then returns directores and files of the inner directores as well
     */
    public abstract getEntries(recursive?: boolean): AsyncIterable<VirtualEntry<any, false>>;
    /**
     * Get all files a from this folder
     * @param recursive if true, then returns files of the inner directores as well
     */
    public abstract getFiles(recursive?: boolean): AsyncIterable<VirtualFile<false>>;
    /**
     * Get all directories a from this folder
     * @param recursive if true, then returns directories of the inner directores as well
     */
    public abstract getDirectories(recursive?: boolean): AsyncIterable<VirtualDirectory<false>>;
    /**
     * Returns an file instance by its name
     */
    public abstract hasFile(name: string): Promise<boolean>;
    public abstract hasDirectory(name: string): Promise<boolean>;
    public abstract hasEntry(name: string): Promise<boolean>;
    public abstract getFile(name: string): Promise<VirtualFile<false> | null>;
    public abstract getDirectory(name: string): Promise<VirtualDirectory<false> | null>;
}