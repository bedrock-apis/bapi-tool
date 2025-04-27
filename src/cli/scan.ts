import { createCommand } from 'commander';
import { ScanReportFormat, ScanSortMode } from '../scan/enums';
import { validateEnum, validateInt } from '../utils';

export default createCommand('scan')
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
        `--format [${Object.values(ScanReportFormat).join('|')}]`,
        `output format.`,
        validateEnum(ScanReportFormat),
        ScanReportFormat.Pretty,
    )
    .option(
        '--topSymbols [int]',
        'when generating a report, how much symbols to include into the "Top symbols" section',
        validateInt(),
        20,
    )
    .option(
        '--extensions',
        'whenether to include custom definitions or not',
        false,
    )
    .option(
        '--file [string]',
        'if provided, writes output to file instead of stdout',
        undefined,
    )
    .option(
        `--sort [${Object.values(ScanSortMode).join('|')}]`,
        'sort mode',
        validateEnum(ScanSortMode),
        ScanSortMode.Size,
    )
    .option(
        '--syntaxKind',
        'whenether to report syntax kind of symbol or not',
        false,
    )
    .option(
        '--noReportUsage',
        'whenether to report usage and top stats or not',
        false,
    )
    .action(
        ({
            tsconfig,
            modules,
            format,
            topSymbols,
            extensions,
            file,
            sort,
            syntaxKind,
            noReportUsage,
        }) => {
            import('../scan/report')
                .then((mod) =>
                    mod.generateReportTypes[format as ScanReportFormat](
                        topSymbols,
                        file,
                        {
                            moduleNames: modules.split(','),
                            tsconfigPath: tsconfig,
                            extensions,
                            sortMode: sort,
                            reportSyntaxKind: syntaxKind,
                            reportUsage: !noReportUsage,
                        },
                    ),
                )
                .catch(console.error);
        },
    );
