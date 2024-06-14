import { VirtualDirectory, VirtualFile } from "../../io";
import * as JSON from "comment-json";
import { CONFIG_VALIDATOR } from "./config-validator";
import { ProjectPack } from "../minecraft/project-pack";
import { MANIFEST_FILE_NAME } from "../../consts";

export class ProjectConfig{
    /**
     * Public
     */
    /**
     * Return and virtual source
     * @readonly
     */
    public readonly sourceFile: VirtualFile;
    /**
     * returns true if config is Loaded
     * @readonly
     */
    public get isLoaded(){return typeof this.rawObject === "object";}

    public rawObject: any;
    public constructor(source: VirtualFile){
        this.sourceFile = source;
    }
    public validate(){
        return CONFIG_VALIDATOR.validate(this.rawObject, [":"]);
    }
    public safeValidate(){
        try {
            this.validate();
            return null;
        } catch (error: any) {
            return error;
        }
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
    getPacks(){return this.rawObject.packs as any;}
    setPacks(data: any){this.rawObject.packs = data; }
    getWorkspace(){ return this.rawObject.bapi.workspace; }
    setWorkspace(data: string){ this.rawObject.bapi.workspace = data; }
    async * getPackDirectories(): AsyncIterableIterator<VirtualDirectory>{
        let dir = this.sourceFile.getBaseDirectory();
        if(!await dir.isValid()) throw new ReferenceError("Could not load config directory: " + dir);
        if(typeof this.getWorkspace() === "string"){
            let theDir = dir.getDirectory(this.getWorkspace());
            if(!await theDir.isValid()) return;
            for await(const dir of theDir.getDirectories()) yield dir;
        }
        else if(this.getPacks()){
            const {
                behaviorPack,
                resourcePack
            } = this.getPacks();
            let p = [];
            if(behaviorPack) p.push(behaviorPack);
            if(resourcePack) p.push(resourcePack);
            for(const path of p){
                let theDir = dir.getDirectory(path);
                if(!await theDir.isValid()) break;
                yield theDir;
            }
        }
        else throw new ReferenceError("No source folders specified");
    }
    async * getProjectPack(): AsyncIterableIterator<ProjectPack>{
        for await(const dir of this.getPackDirectories()){
            const manifestFile = await dir.getFile(MANIFEST_FILE_NAME);
            if(manifestFile != null){
                const p = await ProjectPack.OpenEmpty(dir);
                yield p.setManifestData(JSON.parse((await manifestFile.readFile()).toString()));
            }
        }
    }
}