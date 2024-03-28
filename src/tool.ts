import fs from "node:fs";
import { program, CommandOptions, Command } from "commander";
import { createInterface } from "node:readline";
import path, { dirname } from "node:path";
import chokidar from "chokidar";
import { Config } from "./config-loader";

program.version("0.1.0");
program.option("--init", "Initialize new project.");
program.option("-f, --force", "Forces the job.");
program.action((e)=>{
    if(e.init) return init(e);
});
//program.command("clear").description("Clears minecraft development folder").option("-f, --force", "Forces the deletion").action((e,s)=>console.log("lmao: ",e, s));

program.parse(process.argv);
async function init(data: {force?: boolean}){
    if(!data.force){
        if(fs.existsSync("./config.json")) return console.error("Error: ./config.json file already exists.");
    }
    
    const readLine = createInterface({input: process.stdin, output: process.stdout});
    const config = new Config();
    for(const {name, default: def, task} of Config.initTasks){
        const key = await new Promise(res=>readLine.question(`${name}${def?` (${def})`:""}: `,res)) as string | undefined;
        await task(config, key?.length > 0?key:def);
    }
    const raw = JSON.stringify(config, null,"   ");
    console.log(`generated ./config.json :\n` + raw);
    const isItOk = await new Promise(res=>readLine.question("Is it Ok? ",res)) as string;
    readLine.close();
    if(["n","no"].includes(isItOk.toLowerCase())) return console.log("Canceled");
    fs.writeFileSync("./config.json", raw);
}
//console.log(eval("(\n{} //Ya)"));

/*
const a = chokidar.watch(".", {
    ignoreInitial:true,
    persistent: true
});
program.version("1.0.0");
program.option("--init", "creates a new config file");

a.on("add", (...params)=>{
    console.log("add: ",...params);
});
setTimeout(()=>a.close(), 30_000);
setTimeout(()=>{
if(!(fs.existsSync("./config.json") && fs.statSync("./config.json").isFile())) {
    console.error("./config.json not found, creating new configuration file -> ./config.json");
    fs.writeFileSync("./config.json", JSON.stringify({
        name:"Hello",
        version:"config_version",
    }, null, "\t"));
}else{
    console.log("Config found -> \n" + fs.readFileSync("./config.json").toString());
}}, 50);*/