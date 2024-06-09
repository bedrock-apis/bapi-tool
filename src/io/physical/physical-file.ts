import { promises, existsSync } from "fs";
import { VirtualFile } from "../virtual";
import { PhysicalDirectory } from "./physical-directory";

export class PhysicalFile<Nullable extends boolean = true> extends VirtualFile<Nullable>{
    public writeFile(data: Buffer | string): Promise<void> { return promises.writeFile(this.relativePath, data); }
    public readFile(): Promise<Buffer> { return promises.readFile(this.relativePath); }
    public async delete(): Promise<boolean> { await promises.rm(this.relativePath); return !this.isValid(); }
    public async isValid(): Promise<boolean> { return existsSync(this.relativePath); }
    public readonly name: string;
    public readonly directory: Nullable extends true?PhysicalDirectory<boolean> | null:PhysicalDirectory<boolean>;
    public get relativePath(){ return this.directory?.relativePath + "/" + this.name; }
    public constructor(name: string, base: Nullable extends true?PhysicalDirectory<boolean> | null:PhysicalDirectory<boolean>){
        super();
        this.directory = base;
        this.name = name;
    }
}