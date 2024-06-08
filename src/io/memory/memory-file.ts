import { VirtualFile } from "../virtual";
import { MemoryDirectory } from "./memory-directory";

export class MemoryFile extends VirtualFile{
    public readonly name: string;
    public readonly directory: MemoryDirectory;
    public get relativePath(){ return this.directory.relativePath + "/" + this.name; }
    public constructor(base: MemoryDirectory, name: string){
        super();
        this.directory = base;
        this.name = name;
    }
}