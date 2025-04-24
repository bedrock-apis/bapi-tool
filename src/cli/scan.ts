import { createCommand } from 'commander';
import { scanForSymbolsUsedIn, ScanReportFormat } from '../scan';

export const scanSubcommand = createCommand('scan')
    .description('Scans for ScriptAPI modules used in project')
    .option(
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
        'Output format',
        ScanReportFormat.Json,
    )
    .action(({ tsconfig, modules, format }) => {
        if (!Object.values(ScanReportFormat).includes(format))
            return console.error('Invalid format:', format);

        const report = scanForSymbolsUsedIn(modules.split(','), tsconfig);
        console.log(report.symbols);
        console.log(
            'Total',
            Object.values(report.symbols).reduce((p, c) => c.size + p, 0),
        );
        console.log(
            Object.entries(report.symbols)
                .map(
                    (e) =>
                        e[0] +
                        ': ' +
                        e[1].size +
                        ' ' +
                        (
                            (e[1].size / report.allSymbols[e[0]]?.size) *
                            100
                        ).toFixed(0) +
                        '%',
                )
                .join('\n'),
        );
    });
