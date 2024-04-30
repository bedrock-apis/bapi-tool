import { VirtualEntryType, VirtualFile } from "../virtual";
import { PhysicalDirectory } from "./physical-directory";

export class PhysicalFile extends VirtualFile{
    public readonly name: string;
    public readonly directory: PhysicalDirectory;
    public get relativePath(){ return this.directory.relativePath + "/" + this.name; }
    public constructor(base: PhysicalDirectory, name: string){
        super();
        this.directory = base;
        this.name = name;
    }
}