import { VirtualFile } from "../../io";
import * as JSON from "comment-json";

export class ProjectConfig{
    /**
     * Public
     */
    /**
     * Return and virtual source
     * @readonly
     */
    public readonly source: VirtualFile;
    /**
     * Is config Loaded
     * @readonly
     */
    public get isLoaded(){return typeof this.rawObject === "object";}


    public rawObject: any;
    public constructor(source: VirtualFile){
        this.source = source;
    }

    /**
     * Load a config data
     * @returns Promise with self reference
     */
    async load(){
        if(!await this.source.getExist()) throw new Error("Config file not found: " + this.source.name);
        const data = await this.source.readData();
        try {
            const rawObject = JSON.parse(data.toString());
            this.rawObject = rawObject;
            return this;
        } catch (error: any) {
            throw new Error("Faild to parse config file: " + error.message);
        }
    }

    /**
     * Saves a config data
     * @returns Promise with self reference
     */
    async save(){
        if(!this.isLoaded) throw new Error("Config must be loaded before saving.");
        try {
            const data = JSON.stringify(this.rawObject, null, "   ");
            if(await this.source.writeData(data)) throw new Error("Faild to write data to the source file");
            return this;
        } catch (error: any) {
            throw new Error("Faild to save config file: " + error.message);
        }
    }
}