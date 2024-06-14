import { VirtualEntryType } from "../virtual-entry-type";
import { VirtualEntry } from "./virtual-entry";
import { VirtualFile } from "./virtual-file";

export abstract class VirtualDirectory extends VirtualEntry<VirtualEntryType.Directory>{
    /**
     * @inheritdoc
     * Directory
     */
    public readonly type = VirtualEntryType.Directory;
    /**
     * Get all files and directories from this folder
     * @param recursive if true, then returns directores and files of the inner directores as well
     */
    public abstract getEntries(recursive?: boolean): AsyncIterableIterator<VirtualEntry<any>>;
    /**
     * Get all files a from this folder
     * @param recursive if true, then returns files of the inner directores as well
     */
    public abstract getFiles(recursive?: boolean): AsyncIterableIterator<VirtualFile>;
    /**
     * Get all directories a from this folder
     * @param recursive if true, then returns directories of the inner directores as well
     */
    public abstract getDirectories(recursive?: boolean): AsyncIterableIterator<VirtualDirectory>;
    /**
     * Returns true when file with this name exists
     */
    public abstract hasFile(relativePath: string): Promise<boolean>;
    /**
     * Returns true when directory with this name exists
     */
    public abstract hasDirectory(relativePath: string): Promise<boolean>;
    /**
     * Returns true when entry with this name exists
     */
    public abstract hasEntry(relativePath: string): Promise<boolean>;
    /**
     * Returns a file instance by its name
     */
    public abstract getFile(relativePath: string): VirtualFile;
    /**
     * Returns a directory instance by its name
     */
    public abstract getDirectory(relativePath: string): VirtualDirectory;
    public abstract delete(removeAll?: boolean): Promise<boolean>;
    /**
     * Makes sure that directory exists, and returns its instance
     * @param filePath filePath
     * @returns Valid directory
     */
    public createDirectory(directoryPath: string): Promise<VirtualDirectory>{ return this.getDirectory(directoryPath).create(); }
    /**
     * Makes sure that file exists, and returns its instance
     * @param filePath filePath
     * @param data Data to write, even if file already exists, its still being overwrited with specified data
     * @returns Valid directory
     */
    public createFile(filePath: string, data?: Buffer | string): Promise<VirtualFile>{ return this.getFile(filePath).create(data); }
}