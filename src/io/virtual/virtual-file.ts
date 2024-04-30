import { VirtualEntry, VirtualEntryType } from "./virtual-entry";

export abstract class VirtualFile extends VirtualEntry<VirtualEntryType.File>{
    public readonly type = VirtualEntryType.File;
    public writeData(data: Buffer | string): Promise<Error | void>{ return this.directory.__writeFileAsync(this.name, data); }
    public readData(): Promise<Buffer>{ return this.directory.__readFileAsync(this.name); }
    public delete(): Promise<boolean>{ return this.directory.__deleteFileAsync(this.name); }
    public getExist(): Promise<boolean> { return this.directory.entryExist(this.name); }
}