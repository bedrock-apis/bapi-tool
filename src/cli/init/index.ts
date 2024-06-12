import { program } from "commander";
import { CONFIG_FILE_NAME, ERROR_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts";
import { VirtualDirectory } from "../../io";
import { ProjectConfig, ProjectContext } from "../../project";
import { console, ConsoleColor } from "../../utils";
import { ConsoleReader } from "../../utils/Console/ConsoleReader";
import { Question, QUESTIONS } from "./questions";
import { CURRENT_WORKING_DIRECTORY } from "../base";
import { COMMAND_INIT_CONFIG_EXISTS } from "../../MESSAGES";
import { GetGithubContent } from "../../utils/functions";

program.command("init").description("Initialize new project").option("-f, --force", "Froces the creation.").action(async (...options)=>{
    const [{force=false}] = options;

    const ExistDataPreviewTask = GetGithubContent("https://raw.githubusercontent.com/bedrock-apis/bds-docs/preview/exist.json");
    const ExistDataStableTask = GetGithubContent("https://raw.githubusercontent.com/bedrock-apis/bds-docs/stable/exist.json");


    //Checks if config already exists
    if((await CURRENT_WORKING_DIRECTORY.hasEntry(CONFIG_FILE_NAME)) && !force) return console.log(ERROR_COLOR + COMMAND_INIT_CONFIG_EXISTS);

    //Open file->config->project context
    const configFile = CURRENT_WORKING_DIRECTORY.openFile(CONFIG_FILE_NAME);
    const config = new ProjectConfig(configFile);
    const context = ProjectContext.CreateProject(CURRENT_WORKING_DIRECTORY, config);
    
    config.rawObject = {}; // Clear existing data if exists

    //New CLI Reader
    const reader = console.CreateReader();
    await ProccessQuestions(QUESTIONS, reader, config.rawObject, {ExistDataStableTask, ExistDataPreviewTask});
    reader.close();
    console.log(ConsoleColor.RESET);

    //console.log((await ExistDataStableTask)?.toString(), (await ExistDataPreviewTask)?.toString());

    InitProject(context);

    // Clean->Validate->Save config data
    delete config.rawObject.init;
    config.rawObject.bapi = {
        exports:{
            default:{
                exportType: "mcaddon",
                outDire: "./releases",
                source: "packs"
            }
        }
    }
    config.safeValidate();
    config.save();
});
async function InitProject(context: ProjectContext) {
    const config = context.config;
    const relativeDirectory = context.config.sourceFile.directory??context.workingDirectory;
    let addons: {path:VirtualDirectory, type: 0|1}[] = [];
    if( config.getPacks()){
        const packs = config.getPacks();
        if(packs.behaviorPack) console.log(packs.behaviorPack);
        if(packs.resourcePack) console.log(packs.resourcePack);
    }
    console.log(`Created ${addons.length} addons`);
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