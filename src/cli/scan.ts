import { createCommand } from 'commander';
import { ScanReportFormat } from '../scan/report-format';
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
        `--format <${Object.values(ScanReportFormat).join('|')}>`,
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
    .action(({ tsconfig, modules, format, topSymbols, extensions, file }) => {
        import('../scan/report')
            .then((mod) =>
                mod.generateReportTypes[format as ScanReportFormat](
                    modules.split(','),
                    tsconfig,
                    topSymbols,
                    extensions,
                    file,
                ),
            )
            .catch(console.error);
    });
