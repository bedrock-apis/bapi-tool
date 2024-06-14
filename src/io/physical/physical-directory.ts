import FS, {existsSync, promises as PFS} from "fs";
import { VirtualDirectory, VirtualEntry, VirtualFile } from "../virtual";
import { PhysicalFile } from "./physical-file";
import * as PATH from "node:path";

const directories = new Map<string, PhysicalDirectory>();

export class PhysicalDirectory extends VirtualDirectory{
    public readonly name!: string;
    public readonly fullPath!: string;
    public constructor(filePath: string){
        const f =  PATH.resolve(filePath);
        if(directories.has(f)) return directories.get(f)!;
        super();
        this.fullPath = f;
        this.name = PATH.basename(this.fullPath);
        directories.set(f, this);
    }


    public async * getEntries(recursive?: boolean): AsyncIterableIterator<VirtualEntry<any>> {
        for(const info of await PFS.readdir(this.fullPath, {withFileTypes: true})){
            if(info.isFile()) yield new PhysicalFile(info.path);
            else if(info.isDirectory()) {
                const dir = new PhysicalDirectory(info.path);
                yield dir as any;
                if(recursive) yield * dir.getEntries(recursive);
            }
        }
    }
    public async * getFiles(recursive?: boolean): AsyncIterableIterator<VirtualFile> {
        for(const info of await PFS.readdir(this.fullPath, {withFileTypes: true}))
            if(info.isFile()) yield new PhysicalFile(info.path);
            else if(info.isDirectory()) {
                const dir = new PhysicalDirectory(info.path);
                yield dir as any;
                if(recursive) yield * dir.getFiles(recursive);
            }
    }
    public async * getDirectories(recursive?: boolean): AsyncIterableIterator<VirtualDirectory> {
        for(const info of await PFS.readdir(this.fullPath, {withFileTypes: true}))
            if(info.isDirectory()) {
                const dir = new PhysicalDirectory(info.path);
                yield dir as any;
                if(recursive) yield * dir.getDirectories(recursive);
            }
    }


    public async hasEntry(relativePath: string): Promise<boolean> { return FS.existsSync(PATH.resolve(this.fullPath, relativePath)); }
    public async hasFile(relativePath: string): Promise<boolean> { return PFS.stat(PATH.resolve(this.fullPath, relativePath)).then(e=>e.isFile()).catch(e=>false); }
    public async hasDirectory(relativePath: string): Promise<boolean> { return PFS.stat(PATH.resolve(this.fullPath, relativePath)).then(e=>e.isDirectory()).catch(e=>false); }

    public getFile(relativePath: string): PhysicalFile { return new PhysicalFile(PATH.resolve(this.fullPath,relativePath)); }
    public getDirectory(relativePath: string): PhysicalDirectory { return new PhysicalDirectory(PATH.resolve(this.fullPath,relativePath)); }

    public getBaseDirectory(): PhysicalDirectory { return new PhysicalDirectory(PATH.resolve(this.fullPath,"..")); }
    public isValid(): Promise<boolean> { return this.hasDirectory("."); }
    public async delete(removeAll: boolean = false): Promise<boolean> { 
        if(!this.isValid()) return false;
        const tasks = [];
        for await(const entry of this.getEntries()) tasks.push((entry.delete as any).call(entry, removeAll));
        await Promise.all(tasks);
        return PFS.rmdir(this.fullPath).then(e=>true, e=>false);
    }
    public async create(){
        if(await this.isValid()) return this;
        if(!await this.getBaseDirectory().isValid()) await this.getBaseDirectory().create();
        await PFS.mkdir(this.fullPath);
        return this;
    }
}