import FS, {promises as PFS} from "fs";
import { VirtualDirectory } from "../virtual";
import { PhysicalFile } from "./physical-file";

export class PhysicalDirectory<Nullable extends boolean = true> extends VirtualDirectory<Nullable>{
    public readonly directory: Nullable extends true ? PhysicalDirectory<true> | null : PhysicalDirectory<true>;
    public readonly name: string;
    public get relativePath(): string{
        if(this.directory) return this.directory.relativePath + "/" + this.name;
        else return this.name;
    }
    public constructor(path: string, base: Nullable extends true ? PhysicalDirectory<boolean> | null : PhysicalDirectory<boolean>){
        super();
        this.directory = base;
        this.name = path;
    }
    public async * getEntries(recursive?: boolean): AsyncIterable<PhysicalDirectory<false> | PhysicalFile<false>> {
        for(const info of await PFS.readdir(this.relativePath, {withFileTypes: true})){
            if(info.isFile()) yield new PhysicalFile(info.name, this);
            else if(info.isDirectory()) {
                const dir = new PhysicalDirectory(info.name, this);
                yield dir as any;
                if(recursive) yield * dir.getEntries(recursive);
            }
        }
    }
    public async * getFiles(recursive?: boolean): AsyncIterable<PhysicalFile<false>> {
        for(const info of await PFS.readdir(this.relativePath, {withFileTypes: true})){
            if(info.isFile()) yield new PhysicalFile(info.name, this);
            else if(info.isDirectory()) {
                const dir = new PhysicalDirectory(info.name, this);
                if(recursive) yield * dir.getFiles(recursive);
            }
        }
    }
    public async * getDirectories(recursive?: boolean): AsyncIterable<PhysicalDirectory<false>> {
        for(const info of await PFS.readdir(this.relativePath, {withFileTypes: true})){
            if(info.isDirectory()) {
                const dir = new PhysicalDirectory(info.name, this);
                yield dir as any as PhysicalDirectory<false>;
                if(recursive) yield * dir.getDirectories(recursive);
            }
        }
    }

    public async hasEntry(name: string): Promise<boolean> { return FS.existsSync(this.relativePath + "/" + name); }
    public async hasFile(name: string): Promise<boolean> { return PFS.stat(this.relativePath + "/" + name).then(e=>e.isFile()).catch(e=>false); }
    public async hasDirectory(name: string): Promise<boolean> { return PFS.stat(this.relativePath + "/" + name).then(e=>e.isDirectory()).catch(e=>false); }
    public async getFile(name: string): Promise<PhysicalFile<false> | null> {
        if(await this.hasFile(name)) return new PhysicalFile(name, this);
        else return null;
    }
    public async getDirectory(name: string): Promise<PhysicalDirectory<false> | null> {
        if(await this.hasDirectory(name)) return new PhysicalDirectory(name, this);
        else return null;
    }
    public async isValid(): Promise<boolean> { return FS.existsSync(this.relativePath); }
}