import { VirtualEntryType } from "../../enums";
import { VirtualEntry } from "./virtual-entry";
import { VirtualFile } from "./virtual-file";

export abstract class VirtualDirectory extends VirtualEntry<VirtualEntryType.Directory>{
    public readonly type = VirtualEntryType.Directory;
    public abstract getEntries(recursive?: boolean): Iterable<VirtualEntry<any>>;
    public abstract getFiles(recursive?: boolean): Iterable<VirtualFile>;
    public abstract getDirectories(recursive?: boolean): Iterable<VirtualDirectory>;
    public abstract openFile(name: string): VirtualFile;
    public abstract openDirectory(name: string): VirtualDirectory;
    public abstract entryExist(name: string): Promise<boolean>;
    public abstract getExist(): Promise<boolean>;
    public abstract __readFileAsync(name: string): Promise<Buffer>;
    public abstract __writeFileAsync(name: string, data: Buffer | string): Promise<Error | void>;
    public abstract __deleteFileAsync(name: string): Promise<boolean>;
}