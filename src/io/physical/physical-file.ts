import { promises, existsSync } from "fs";
import { VirtualFile } from "../virtual";
import { PhysicalDirectory } from "./physical-directory";
import * as PATH from "node:path";

const files = new Map<string, PhysicalFile>();
export class PhysicalFile extends VirtualFile{
    public readonly name!: string;
    public readonly fullPath!: string;
    public constructor(path: string){
        const f = PATH.resolve(path);
        if(files.has(f)) return files.get(f)!;
        super();
        this.fullPath = f;
        this.name = PATH.basename(f);
    }
    public async writeFile(data: Buffer | string): Promise<void> { return promises.writeFile(this.fullPath, data); }
    public async readFile(): Promise<Buffer> { return promises.readFile(this.fullPath); }
    public async tryReadFile(): Promise<Buffer | null>{
        if(await this.isValid()) return this.readFile();
        return null;
    }
    public getBaseDirectory(): PhysicalDirectory { return new PhysicalDirectory(PATH.dirname(this.fullPath)); }
    public async isValid(): Promise<boolean> { return existsSync(this.fullPath);}
    public async delete(): Promise<boolean> { await promises.rm(this.fullPath); return !this.isValid(); }
    public async create(data?: Buffer | string){
        if(await this.isValid()) {
            if(data) await this.writeFile(data);
            return this;
        }
        if(!await this.getBaseDirectory().isValid()) await this.getBaseDirectory().create();
        await this.writeFile(data??"");
        return this;
    }
}