import { parse, stringify } from "comment-json";
import { MANIFEST_FILE_NAME, PACK_ICON_FILE_NAME, PACK_ICON_PNG } from "../../consts";
import { VirtualDirectory } from "../../io";
import { Manifest } from "./manifest";
import { ProjectContext } from "../project-context";

export class ProjectPack {
    /**
     * Root dir of that pack
     */
    public readonly rootDir;
    public manifestData?: Manifest;
    public static async Initialize(rootDirectory: VirtualDirectory, context: ProjectContext, manifest: Manifest, log?:(path: string)=>void){
        log ??= ()=>{};
        const texts = await rootDirectory.createDirectory("texts");
        log(texts.fullPath);
        log((await texts.createFile("languages.json", JSON.stringify(["en_US"],null,"  "))).fullPath);
        log((await texts.createFile("en_US.lang", [
            `pack.name=${context.config.getName()}`,
            `pack.description=${context.config.getName()} by ${context.config.getAuthor()}`
        ].join("\n"))).fullPath);
        if(Manifest.HasScripting(manifest)) {
            const file = await rootDirectory.createFile(manifest.modules[0].entry!, 'console.warn("Hello World");');
            log(file.fullPath);
        }
        log((await rootDirectory.createFile(MANIFEST_FILE_NAME, JSON.stringify(manifest, null, "  "))).fullPath);
        log((await rootDirectory.createFile(PACK_ICON_FILE_NAME, Buffer.from(PACK_ICON_PNG, "base64"))).fullPath);
    }
    public static async OpenPack(rootDirectory: VirtualDirectory){
        if(!await rootDirectory.hasFile(MANIFEST_FILE_NAME)) throw new ReferenceError("Manifest not found in " + rootDirectory);
        const data = await rootDirectory.getFile(MANIFEST_FILE_NAME).tryReadFile();
        if(data == null) throw new Error("Faild to read manifest file in " + rootDirectory);
        const raw = parse(data.toString()) as unknown as Manifest;
        if(raw.format_version !== 2) throw new SyntaxError("Unsuported manifest format: " + raw.format_version);

        const packRoot = new ProjectPack(rootDirectory);

        packRoot.manifestData = raw;
        return packRoot;
    }
    /**
     * 
     * @param rootDir Root dir fot new ProjectPacks
     * @returns returns new empty project pack
     */
    public static async OpenEmpty(rootDir: VirtualDirectory){ return new ProjectPack(rootDir); }
    protected constructor(rootDirectory: VirtualDirectory){ this.rootDir = rootDirectory; }

    /**
     * True when folder exists with manifest.json in it
     * @returns Boolean
     */
    public async isValid(){return (await this.rootDir.isValid()) && (await this.rootDir.hasFile("manifest.json"));}
    public async saveManifest(){
        await this.rootDir.getFile(MANIFEST_FILE_NAME).create(stringify(this.manifestData, null, "  "));
    }
    public setManifestData(data: any){
        if(data.format_version !== 2) throw new SyntaxError("Unsuported manifest format: " + data.format_version);
        this.manifestData = data;
        return this;
    }
}