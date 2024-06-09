import { VirtualEntryType } from "../virtual-entry-type";
import { VirtualDirectory, VirtualFile } from "../virtual";
import { MemoryFile } from "./memory-file";

export class MemoryDirectory extends VirtualDirectory{
    public directory: MemoryDirectory | null = null;
    public name: string;
    public get relativePath(): string{
        if(this.directory) return this.directory.relativePath + "/" + this.name;
        else return this.name;
    }
    protected readonly __files = new Map<string, Buffer>();
    protected readonly __directories = new Map<string, MemoryDirectory>();
    public constructor(name: string, base?: MemoryDirectory){
        super();
        this.directory = base??null;
        this.name = name;
    }
    public *getEntries(recursive?: boolean): Iterable<MemoryDirectory | MemoryFile> {
        for(const file of this.__files.keys()) yield new MemoryFile(this, file);
        for(const dir of this.__directories.values()){
            yield dir;
            if(recursive) yield * dir.getEntries(recursive);
        }
    }
    public *getFiles(recursive?: boolean): Iterable<MemoryFile> { for(const file of this.getEntries(recursive)) if(file.type === VirtualEntryType.File) yield file as MemoryFile; }
    public *getDirectories(recursive?: boolean): Iterable<MemoryDirectory> {  for(const dir of this.getEntries(recursive)) if(dir.type === VirtualEntryType.Directory) yield dir as MemoryDirectory; }
    public openFile(name: string): VirtualFile {
        if(!this.__files.has(name)){ this.__files.set(name, Buffer.from("")); }
        return new MemoryFile(this, name);
    }
    public openDirectory(name: string): MemoryDirectory {
        let dir = this.__directories.get(name);
        if(!dir) this.__directories.set(name, dir = new MemoryDirectory(name, this));
        return dir;
    }
    public entryExist(name: string): Promise<boolean> { return Promise.resolve(this.__files.has(name) || this.__directories.has(name)); }
    public isValid(): Promise<boolean> { return Promise.resolve(true); }
    public async __readFileAsync(name: string): Promise<Buffer> {
        const buffer = this.__files.get(name);
        if(!buffer) throw new ReferenceError("File not found: " + name + " in " + this.relativePath);
        return buffer;
    }
    public async __writeFileAsync(name: string, data: Buffer | string): Promise<Error | void> {
        try {
            this.__files.set(name, typeof data === "string"?Buffer.from(data):data);
        } catch (error: any) {
            return error;
        }
    }
    public async __deleteFileAsync(name: string): Promise<boolean> { return this.__files.delete(name); }
}