import FS, {promises as PFS} from "fs";
import { VirtualDirectory, VirtualFile } from "../virtual";
import { PhysicalFile } from "./physical-file";
import * as PATH from "node:path";
import { dir } from "console";

export class PhysicalDirectory<Nullable extends boolean = true> extends VirtualDirectory<Nullable>{
    public openFile(name: string): PhysicalFile<false> { return new PhysicalFile<false>(name, this);}
    public openDirectory(name: string): PhysicalDirectory<false> { return new PhysicalDirectory<false>(name, this); }
    public async getFileRelative(name: string, createPath: boolean): Promise<PhysicalFile<boolean>> {
        const path = name.replaceAll("\\","/").split("/");
        const part = path.at(-1);
        let currentDirectory = path.length>0?await this.getDirectoryRelative(path.slice(0, -1).join("/"), createPath):this;
        let file = await currentDirectory.getFile(part!) as any;
        if(file === null) {
            if(createPath) file = await currentDirectory.createFile(part!);
            else throw new ReferenceError("path doesn't exists: " + name);
        }
        return file;
    }
    public async getDirectoryRelative(name: string, createPath: boolean): Promise<PhysicalDirectory<boolean>> {
        const path = name.replaceAll("\\","/").split("/");
        let currentDirectory = this as PhysicalDirectory<boolean>;
        let canReturn = true;
        for(let i = 0; i < path.length; i++){
            const part = path[i];
            if(part == ".."){
                if(canReturn){
                    currentDirectory = currentDirectory.directory??new PhysicalDirectory<true>(PATH.resolve(currentDirectory.relativePath, ".."),null);
                }else throw new SyntaxError("Invalid path format: " + name);
            } else if(part === ".") {
                if(!canReturn) throw new SyntaxError("Invalid path format: " + name);
            }
            else {
                let dir = await currentDirectory.getDirectory(part) as any;
                if(dir === null) {
                    if(createPath) dir = await currentDirectory.createDirectory(part);
                    else throw new ReferenceError("path doesn't exists: " + name);
                }
                currentDirectory = dir;
            }
            canReturn = false;
        }
        return currentDirectory;
    }
    public readonly directory: Nullable extends true ? PhysicalDirectory<true> | null : PhysicalDirectory<true>;
    public readonly name: string;
    public get relativePath(): string{
        if(this.directory) return this.directory.relativePath + "/" + this.name;
        else return this.name;
    }
    public constructor(name: string, base: Nullable extends true ? PhysicalDirectory<boolean> | null : PhysicalDirectory<boolean>){
        super();
        this.directory = base;
        this.name = name;
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
    public async delete(): Promise<boolean> { 
        if(!this.isValid()) return false;
        const tasks = [];
        for await(const entry of this.getEntries()){
            tasks.push(entry.delete());
        }
        await Promise.all(tasks);
        return PFS.rmdir(this.relativePath).then(e=>true, e=>false);
    }
    public async createFile(name: string): Promise<PhysicalFile<false>> {
        if(await this.hasFile(name)) return (await this.getFile(name))!;
        await PFS.writeFile(this.relativePath + "/" + name, "");
        return new PhysicalFile<false>(name, this);
    }
    public async createDirectory(name: string): Promise<VirtualDirectory<false>> {
        if(await this.hasDirectory(name)) return (await this.getDirectory(name))!;
        await PFS.mkdir(this.relativePath + "/" + name);
        return new PhysicalDirectory<false>(name, this);
    }
}