import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'rolldown';
import { dependencies, devDependencies } from './package.json';

const libNames = [
    ...Reflect.ownKeys(dependencies),
    ...Reflect.ownKeys(devDependencies),
].filter((e) => typeof e === 'string');

fs.readdirSync('bin').forEach((e) =>
    fs.rmSync(path.join('bin', e), { force: true, recursive: true }),
);

export default defineConfig([
    {
        external: [new RegExp(`^(${libNames.join('|')}|node:)`)],
        input: './src/cli/bapi.ts',
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
            sourcemap: 'inline',
            intro: '#!/usr/bin/env node\n', // Used to set a cli
            dir: './bin',
            minify: true,
            target: 'esnext',
        },
    },
]);
