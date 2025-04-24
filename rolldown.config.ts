import { defineConfig } from 'rolldown';
import { dependencies, devDependencies } from './package.json';

const libNames = [
    ...Reflect.ownKeys(dependencies),
    ...Reflect.ownKeys(devDependencies),
].filter((e) => typeof e === 'string');

export default defineConfig([
    {
        external: [new RegExp(`^(${libNames.join('|')}|node:)`)],
        input: './src/cli/index.ts',
        /*
        transform:{
            decorator: {
                legacy: true,
                emitDecoratorMetadata: true
            }
        },*/
        keepNames: true,
        platform: 'node',
        output: {
            intro: '#!/usr/bin/env node\n', // Used to set a cli
            file: './bin/bapi',
            //dir: "./bin",
            minify: true,
            target: 'esnext',
        },
    },
]);
