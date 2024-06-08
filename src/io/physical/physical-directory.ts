import * as PATH from "path";
import FS, {promises as PFS} from "fs";
import { VirtualDirectory, VirtualEntry, VirtualFile } from "../virtual";
import { PhysicalFile } from "./physical-file";
import { VirtualEntryType } from "../../enums";

export class PhysicalDirectory extends VirtualDirectory{
    public directory: PhysicalDirectory | null = null;
    public name: string;
    public get relativePath(): string{
        if(this.directory) return this.directory.relativePath + "/" + this.name;
        else return this.name;
    }
    public get fullPath(){return PATH.resolve(this.relativePath);}
    public constructor(name: string, base?: PhysicalDirectory){
        super();
        this.directory = base??null;
        this.name = name;
    }
    public *getEntries(recursive?: boolean): Iterable<PhysicalDirectory | PhysicalFile> {
        for(const info of FS.readdirSync(this.relativePath, {withFileTypes: true})){
            if(info.isFile()) yield new PhysicalFile(this, info.name);
            else if(info.isDirectory()) {
                const dir = new PhysicalDirectory(info.name, this);
                yield dir;
                if(recursive) yield * dir.getEntries(recursive);
            }
        }
    }
    public *getFiles(recursive?: boolean): Iterable<PhysicalFile> { for(const file of this.getEntries(recursive)) if(file.type === VirtualEntryType.File) yield  file as PhysicalFile; }
    public *getDirectories(recursive?: boolean): Iterable<PhysicalDirectory> {  for(const dir of this.getEntries(recursive)) if(dir.type === VirtualEntryType.Directory) yield dir as PhysicalDirectory; }
    public openFile(name: string): VirtualFile { return new PhysicalFile(this, name); }
    public openDirectory(name: string): PhysicalDirectory { return new PhysicalDirectory(name, this); }
    public entryExist(name: string): Promise<boolean> { return Promise.resolve(FS.existsSync(this.relativePath + "/" + name)); }
    public getExist(): Promise<boolean> { return Promise.resolve(FS.existsSync(this.relativePath)); }
    public __readFileAsync(name: string): Promise<Buffer> { return PFS.readFile(this.relativePath + "/" + name); }
    public async __writeFileAsync(name: string, data: Buffer | string): Promise<Error | void> {
        let success: Error | void = undefined;
        await PFS.writeFile(this.relativePath + "/" + name, data).catch(e=>success = e);
        return success;
    }
    public async __deleteFileAsync(name: string): Promise<boolean> {
        let success = true;
        await PFS.rm(this.relativePath + "/" + name).catch(e=>success = false);
        return success;
    }
}