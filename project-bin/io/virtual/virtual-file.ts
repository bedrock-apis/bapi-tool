import { VirtualEntryType } from '../virtual-entry-type';
import { VirtualEntry } from './virtual-entry';

export abstract class VirtualFile extends VirtualEntry<VirtualEntryType.File> {
    public readonly type = VirtualEntryType.File;
    /**
     * Writes a data to this file.
     * @param data Buffer or string to write to file.
     */
    public abstract writeFile(data: Buffer | string): Promise<void>;
    /**
     * Reads a data from this file.
     */
    public abstract readFile(): Promise<Buffer>;
    /**
     * Reads a data from this file.
     */
    public abstract tryReadFile(): Promise<Buffer | null>;
    public abstract create(data?: Buffer | string): Promise<this>;
}
