import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';
import { start } from '../cli/init';
import { scanForSymbolsUsedIn, ScanReportModules } from './main';
import { ScanReportFormat } from './report-format';

type ScanReportGenerator = (
    modules: string[],
    tsconfigPath: string,
    topFiles: number,
    extensions: boolean,
    file: string | undefined,
) => void;

export const generateReportTypes: Record<
    ScanReportFormat,
    ScanReportGenerator
> = {
    [ScanReportFormat.Json]: generateJsonReport.bind(null, undefined),
    [ScanReportFormat.JsonFormatted]: generateJsonReport.bind(null, 2),
    [ScanReportFormat.Pretty]: generatePrettyReport,
};

function generatePrettyReport(
    modules: string[],
    tsconfig: string,
    topFiles: number,
    extensions: boolean,
    file: string | undefined,
): void {
    const output = createOutput(file);

    const report = scanForSymbolsUsedIn(modules, tsconfig, extensions, output);

    if (file) chalk.level = 0;

    if (!file) {
        console.log(report.symbols);
    }

    const time = Date.now() - start;
    console.log('Done in', (time / 1000).toFixed(2) + 's');
    if (file) console.log('Written to', path.resolve(file));

    const usedSymbols = countSymbols(report.symbols);
    const allSymbols = countSymbols(report.all);

    output(' ');
    output(`Top ${topFiles} most used symbols: `);
    output(' ');
    const mostUsedSymbols = Object.values(report.symbols)
        .map((e) =>
            [...e.entries()].map(([k, m]) => ({
                symbol: k,
                usages: m.usages,
            })),
        )
        .flat()
        .sort((a, b) => b.usages - a.usages)
        .map((e) => `  ${chalk.bold(e.symbol)} ${chalk.yellow(e.usages)}`)
        .slice(0, topFiles)
        .join('\n');

    output(mostUsedSymbols);
    output(' ');

    if (file) output();
    output(
        `${chalk.bold('Total symbols usage')}: ${percent(usedSymbols, allSymbols)}`,
    );
    output(' ');
    output(
        Object.entries(report.symbols)
            .map(([name, symbols]) => {
                if (!report.all[name]) return;

                return `${chalk.bold(name)}: ${percent(symbols.size, report.all[name].size)}`;
            })
            .join('\n'),
    );

    if (file) {
        output(' ');
        for (const [moduleName, parents] of Object.entries(report.byParent)) {
            output(' ');
            output(' ');
            output('> ' + moduleName);
            output(' ');
            for (const [parent, symbols] of Object.entries(parents)) {
                output(' ');
                output(parent);
                output(' ');
                for (const [symbol, { usages }] of symbols) {
                    output(' ' + symbol + ' ' + usages);
                }
            }
        }
        output(' ');
    }
}

function createOutput(file: string | undefined) {
    const fileStream = file && fs.createWriteStream(file);
    const output = file
        ? (...values: unknown[]) => {
              const string = util.format(...values);
              if (fileStream) fileStream.write(string + '\n');
          }
        : console.log;
    return output;
}

function countSymbols(symbols: ScanReportModules): number {
    return Object.values(symbols).reduce((p, c) => c.size + p, 0);
}

function percent(value: number, total: number): string {
    return `${chalk.yellow(value + '/' + total)} symbols (${chalk.cyan(((value / total) * 100).toFixed(0) + '%')})`;
}

function generateJsonReport(
    space: undefined | number,
    modules: string[],
    tsconfig: string,
    _topFiles: number,
    extensions: boolean,
    file: string | undefined,
): void {
    const output = createOutput(file);

    const report = scanForSymbolsUsedIn(
        modules,
        tsconfig,
        extensions,
        // Noop, to disable logs
        () => void 0,
    );

    output(
        JSON.stringify(
            report,
            (_, v) => (v instanceof Map ? Object.fromEntries(v.entries()) : v),
            space,
        ),
    );
}
