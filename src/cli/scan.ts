import chalk from 'chalk';
import { createCommand, InvalidArgumentError } from 'commander';
import {
    scanForSymbolsUsedIn,
    ScanReportFormat,
    ScanReportSymbols,
} from '../scan';

const start = Date.now();

export const scanSubcommand = createCommand('scan')
    .description('Scans for ScriptAPI modules used in project')
    .requiredOption(
        '--tsconfig <string>',
        `path to your project's tsconfig.json or jsconfig.json file`,
    )
    .option(
        '--modules [string[]]',
        `names of modules to be scanned separated by ,`,
        '@minecraft/server,@minecraft/server-ui,@minecraft/server-net,@minecraft/server-admin,@minecraft/common',
    )
    .option(
        `--format <${Object.values(ScanReportFormat).join('|')}>`,
        `output format. Use ${ScanReportFormat.PrettyFile} with bapi scan --format pretty-file ... >> file.md`,
        (format) => {
            if (!(format in generateReportTypes)) {
                throw new InvalidArgumentError('invalid format: ' + format);
            } else return format;
        },
        ScanReportFormat.Pretty,
    )
    .action(({ tsconfig, modules, format }) => {
        generateReportTypes[format as ScanReportFormat](
            modules.split(','),
            tsconfig,
        );
    });

type ScanReportGenerator = (modules: string[], tsconfigPath: string) => void;

const generateReportTypes: Record<ScanReportFormat, ScanReportGenerator> = {
    [ScanReportFormat.Json]: generateJsonReport.bind(null, undefined),
    [ScanReportFormat.JsonFormatted]: generateJsonReport.bind(null, 2),
    [ScanReportFormat.Pretty]: generatePrettyReport.bind(null, false),
    [ScanReportFormat.PrettyFile]: generatePrettyReport.bind(null, true),
};

function generatePrettyReport(
    toFile: boolean,
    modules: string[],
    tsconfig: string,
): void {
    const report = scanForSymbolsUsedIn(modules, tsconfig);

    if (toFile) chalk.level = 0;

    if (!toFile) {
        console.log(report.symbols);
        const time = Date.now() - start;
        console.log('Done in', ~~(time / 1000) + 'ms');
    }

    const usedSymbols = countSymbols(report.symbols);
    const allSymbols = countSymbols(report.allSymbols);

    if (toFile) console.log();
    console.log(
        `${chalk.bold('Total symbols count')}: ${percent(usedSymbols, allSymbols)}`,
    );
    console.log(' ');
    console.log(
        Object.entries(report.symbols)
            .map(([name, symbols]) => {
                if (!report.allSymbols[name]) return;

                return `${chalk.bold(name)}: ${percent(symbols.size, report.allSymbols[name].size)}`;
            })
            .join('\n'),
    );

    if (toFile) {
        console.log(' ');
        for (const [moduleName, parents] of Object.entries(report.parent)) {
            console.log(' ');
            console.log(' ');
            console.log('> ' + moduleName);
            console.log(' ');
            for (const [parent, symbols] of Object.entries(parents)) {
                console.log(' ');
                console.log(parent);
                console.log(' ');
                for (const symbol of symbols) {
                    console.log(' ' + symbol);
                }
            }
        }
        console.log(' ');
    }
}

function countSymbols(symbols: ScanReportSymbols): number {
    return Object.values(symbols).reduce((p, c) => c.size + p, 0);
}

function percent(value: number, total: number): string {
    return `${chalk.yellow(value + '/' + total)} symbols (${chalk.cyan(((value / total) * 100).toFixed(0) + '%')})`;
}

function generateJsonReport(
    space: undefined | number,
    modules: string[],
    tsconfig: string,
): void {
    const report = scanForSymbolsUsedIn(
        modules,
        tsconfig,
        // Noop, to disable logs
        () => void 0,
    );
    console.log(
        JSON.stringify(
            report,
            (k, v) => (v instanceof Set ? [...v] : v),
            space,
        ),
    );
}
