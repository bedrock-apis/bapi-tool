import { ERROR_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts";
import { console, ConsoleColor } from "../../utils";
import { ConsoleReader } from "../../utils/Console/ConsoleReader";
import { context } from "../base";
import { Question, QUESTIONS } from "./questions";

context.context.projectCommands.registryCommand("init", e=>e.description("Initialize new project").option("-f, --force", "Froces the creation.").action(async (...options)=>{
    const [{force=false}] = options;
    let config = context.context.config.rawObject;
    if(config && !force) return console.error(ERROR_COLOR + "Project config already exists.");
    context.context.config.rawObject = config = {};
    const reader = console.CreateReader();
    await ProccessQuerstions(QUESTIONS, reader, config);
    reader.close();
    context.context.config.save();
}));

async function ProccessQuerstions(questions: Question[], reader: ConsoleReader, config: any){
    for(const q of questions){
        while(true){
            const {name, default: def, getQuestions, isInvalid, propertyName, setValue, map} = q;
            const ask = `${ConsoleColor.RESET}${name} ${def?`${SECONDARY_COLOR}(${def}) `:""}${PRIMARY_COLOR}`;
            let data = await reader.ReadLineAsync(ask);
            data = (data.length>0?data:def)??"";
            if(isInvalid?.call(q, data)) continue;
            const moreQuestions = getQuestions?.call(q,data);
            if(moreQuestions) await ProccessQuerstions(moreQuestions, reader, config);
            setValue?.call(q, config, data);
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
                object[lastProperty!] = map?map.call(q,data):data;
            }
            break;
        }
    }
}