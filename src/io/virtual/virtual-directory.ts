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
     * Returns true when file with this name exists
     */
    public abstract hasFile(name: string): Promise<boolean>;
    /**
     * Returns true when directory with this name exists
     */
    public abstract hasDirectory(name: string): Promise<boolean>;
    /**
     * Returns true when entry with this name exists
     */
    public abstract hasEntry(name: string): Promise<boolean>;
    /**
     * Returns a file instance by its name
     */
    public abstract getFile(name: string): Promise<VirtualFile<false> | null>;
    /**
     * Returns a directory instance by its name
     */
    public abstract getDirectory(name: string): Promise<VirtualDirectory<false> | null>;
    /**
     * Creates new file instance with specified name
     */
    public abstract createFile(name: string): Promise<VirtualFile<false>>;
    /**
     * Creates new directory instance with specified name
     */
    public abstract createDirectory(name: string): Promise<VirtualDirectory<false>>;
    /**
     * Get specific file with by relative path
     */
    public abstract getFileRelative(name: string, createPath: boolean): Promise<VirtualFile<boolean>>;
    /**
     * Get specific directory with by relative path
     */
    public abstract getDirectoryRelative(name: string, createPath: boolean): Promise<VirtualDirectory<boolean>>;
    /**
     * Get new instance even if file doesn't exists
     */
    public abstract openFile(name: string): VirtualFile<false>;
    /**
     * Get new instance even if file doesn't exists
     */
    public abstract openDirectory(name: string): VirtualDirectory<false>;
}