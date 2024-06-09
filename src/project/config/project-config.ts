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
    public readonly source: VirtualFile<boolean>;
    /**
     * Is config Loaded
     * @readonly
     */
    public get isLoaded(){return typeof this.rawObject === "object";}

    public rawObject: any;
    public constructor(source: VirtualFile<boolean>){
        this.source = source;
    }

    /**
     * Load a config data
     * @returns Promise with self reference
     */
    async load(){
        if(!await this.source.isValid()) throw new Error("Config file not found: " + this.source.name);
        const data = await this.source.readFile();
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
            await this.source.writeFile(data)
            return this;
        } catch (error: any) {
            throw new Error("Faild to save config file: " + error.message);
        }
    }
    getVersion(){return this.rawObject.version as string;}
    async setVersion(data: string){this.rawObject.version = data; await this.save(); }
    getName(){return this.rawObject.name as string;}
    async setName(data: string){this.rawObject.name = data; await this.save(); }
    getAuthor(){return this.rawObject.author as string;}
    async setAuthor(data: string){this.rawObject.author = data; await this.save(); }
}