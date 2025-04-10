import {defineConfig} from "rolldown";
import {dependencies} from "./package.json";

export default defineConfig({
    external: [
        new RegExp(Reflect.ownKeys(dependencies).filter(e=>(typeof e === "string")).join("|") + "|node:")
    ],
    input: "./src/cli/index.ts",
    platform: "node",
    output: {
        intro:"#!/usr/bin/env node\n", // Used to set a cli
        file: "./bin/bapi"
    }
});