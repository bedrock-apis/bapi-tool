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
    public readonly sourceFile: VirtualFile<boolean>;
    /**
     * Is config Loaded
     * @readonly
     */
    public get isLoaded(){return typeof this.rawObject === "object";}

    public rawObject: any;
    public constructor(source: VirtualFile<boolean>){
        this.sourceFile = source;
    }

    /**
     * Load a config data
     * @returns Promise with self reference
     */
    async load(){
        if(!await this.sourceFile.isValid()) throw new Error("Config file not found: " + this.sourceFile.name);
        const data = await this.sourceFile.readFile();
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
            await this.sourceFile.writeFile(data)
            return this;
        } catch (error: any) {
            throw new Error("Faild to save config file: " + error.message);
        }
    }
    getVersion(){return this.rawObject.version as string;}
    setVersion(data: string){this.rawObject.version = data; }
    getName(){return this.rawObject.name as string;}
    setName(data: string){this.rawObject.name = data; }
    getAuthor(){return this.rawObject.author as string;}
    setAuthor(data: string){this.rawObject.author = data; }
}