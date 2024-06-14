import { program } from "commander";
import { CONFIG_FILE_NAME, ERROR_COLOR, MIN_ENGINE_VERSION_ARRAY, PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts";
import { VirtualDirectory } from "../../io";
import { Manifest, ManifestDependency, ManifestHeader, ProjectConfig, ProjectContext } from "../../project";
import { console, ConsoleColor } from "../../utils";
import { ConsoleReader } from "../../utils/Console/ConsoleReader";
import { Question, QUESTIONS } from "./questions";
import { CURRENT_WORKING_DIRECTORY } from "../base";
import { COMMAND_INIT_CONFIG_EXISTS } from "../../MESSAGES";
import { GetGithubContent } from "../../utils/functions";
import { randomUUID } from "node:crypto";
import { ProjectPack } from "../../project/minecraft/project-pack";

program.command("init").description("Initialize new project").option("-f, --force", "Froces the creation.").action(async (...options)=>{
    const [{force=false}] = options;

    //const bdsDataTask = GetGithubContent("https://raw.githubusercontent.com/bedrock-apis/bds-docs/stable/exist.json");


    //Checks if config already exists
    if((await CURRENT_WORKING_DIRECTORY.hasEntry(CONFIG_FILE_NAME)) && !force) return console.log(ERROR_COLOR + COMMAND_INIT_CONFIG_EXISTS);

    //Open file->config->project context
    const configFile = CURRENT_WORKING_DIRECTORY.getFile(CONFIG_FILE_NAME);
    const config = new ProjectConfig(configFile);
    const context = ProjectContext.CreateProject(CURRENT_WORKING_DIRECTORY, config);
    
    config.rawObject = {}; // Clear existing data if exists

    //New CLI Reader
    const reader = console.CreateReader();
    await ProccessQuestions(QUESTIONS, reader, config.rawObject, {});
    reader.close();
    console.log(ConsoleColor(50,50,50).toString());
    //console.log((await ExistDataStableTask)?.toString(), (await ExistDataPreviewTask)?.toString());

    await InitProject(context);
    
    console.log(ConsoleColor.RESET);

    //console.log(await bdsDataTask);
    // Clean->Validate->Save config data
    delete config.rawObject.init;
    config.rawObject.bapi = {
        workspace: "packs",
        exports:{
            default:{
                exportType: "mcaddon",
                outDire: "./releases",
                source: "packs"
            }
        },
        watchers:{
            default:{}
        }
    }
    config.safeValidate();
    config.save();
});
async function InitProject(context: ProjectContext) {
    const config = context.config;
    const relativeDirectory = context.config.sourceFile.getBaseDirectory()??context.workingDirectory;
    if(config.getPacks()){
        const packs = config.getPacks();
        const dependency1 = {};
        const dependency2 = {};
        let task1 = Promise.resolve();
        if(packs.behaviorPack) {
            
            const isScript = config.rawObject.init.options.use_script;
            let manifest =  Manifest.CreateManifest(isScript?"script":"data", context.config.getVersion());
            Object.assign(dependency1, Manifest.AsDependency(manifest));
            manifest.dependencies = [
                {
                    module_name: "@minecraft/server",
                    version: "1.12.0"
                },
                {
                    module_name: "@minecraft/server-ui",
                    version: "1.2.0"
                },
                dependency2 as ManifestDependency
            ]
            manifest.modules[0].entry = "scripts/index.js";
            const data = await relativeDirectory.createDirectory(packs.behaviorPack);
            task1 = ProjectPack.Initialize(
                data, 
                context,
                manifest,
                console.log
            );
        }
        if(packs.resourcePack) {
            let manifest = Manifest.CreateManifest("resources", context.config.getVersion());
            Object.assign(dependency2, Manifest.AsDependency(manifest));
            manifest.dependencies.push(dependency1 as ManifestDependency);
            await task1;
            const data = await relativeDirectory.createDirectory(packs.resourcePack);
            await ProjectPack.Initialize(
                data, 
                context, 
                manifest,
                console.log
            )
        }
    }
}
async function ProccessQuestions(questions: Question[], reader: ConsoleReader, config: any, DATA: any){
    for(const q of questions){
        while(true){
            const {name, default: def, getQuestions, isInvalid, propertyName, setValue, map} = q;
            const ask = `${ConsoleColor.RESET}${name} ${def?`${SECONDARY_COLOR}(${def}) `:""}${PRIMARY_COLOR}`;
            let data = await reader.ReadLineAsync(ask);
            data = (data.length>0?data:def)??"";
            if(isInvalid?.call(q, data, DATA)) continue;
            const moreQuestions = getQuestions?.call(q,data, DATA);
            if(moreQuestions) await ProccessQuestions(moreQuestions, reader, config, DATA);
            setValue?.call(q, config, data, DATA);
            if(propertyName) {
                const pathTo = propertyName.split(".");
                let object = config;
                let lastProperty = null;
                for(const property of pathTo){
                    if(lastProperty) {
                        object = object[lastProperty] = object[lastProperty]??{};
                    }
                    lastProperty = property;
                }
                object[lastProperty!] = map?map.call(q, data, DATA):data;
            }
            break;
        }
    }
}