import path from 'node:path';
import ts from 'typescript';

export function createProgram(
    tsconfigPath: string,
    log = console.log,
): ts.Program {
    tsconfigPath = path.resolve(tsconfigPath);
    log('Using', tsconfigPath);
    const config = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    if (config.error) {
        throw new Error('Errors parsing tsconfig:', {
            cause: config.error.messageText,
        });
    }

    const parsedConfig = ts.parseJsonConfigFileContent(
        config.config,
        ts.sys,
        path.resolve(path.dirname(tsconfigPath)),
    );

    if (parsedConfig.errors.length) {
        throw new Error('Errors parsing tsconfig:', {
            cause: parsedConfig.errors.map((e) => e.messageText),
        });
    }

    log('Parsed config which includes', parsedConfig.fileNames.length, 'files');

    const program = ts.createProgram(
        parsedConfig.fileNames,
        parsedConfig.options,
    );

    return program;
}

export interface ScanReport {
    symbols: ScanReportSymbols;
    parent: Record<string, ScanReportSymbols>;
    allSymbols: ScanReportSymbols;
}

export type ScanReportSymbols = Record<string, Map<string, ScanReportSymbol>>;

export interface ScanReportSymbol {
    usages: number;
}

export function scanForSymbolsUsedIn(
    moduleNames: string[],
    tsconfigPath: string,
    extensions = false,
    log = console.log,
    program = createProgram(tsconfigPath, log),
): ScanReport {
    const checker = program.getTypeChecker();
    log('Scanning for', moduleNames);

    const usedSymbols: ScanReportSymbols = {};
    const usedSymbolsByParent: Record<string, ScanReportSymbols> = {};

    const allSymbols: ScanReportSymbols = {};

    function visitModules(node: ts.Node): void {
        if (ts.isIdentifier(node)) {
            const symbol = checker.getSymbolAtLocation(node);
            if (symbol) addSymbol(symbol, allSymbols, {});
        }
        ts.forEachChild(node, visitModules);
    }

    function visit(node: ts.Node): void {
        if (ts.isImportDeclaration(node)) {
            const moduleSpecifier = node.moduleSpecifier;
            const moduleName =
                moduleSpecifier &&
                ts.isStringLiteral(moduleSpecifier) &&
                moduleSpecifier.text;

            if (moduleName && moduleNames.includes(moduleName)) {
                // Iterate through named imports/exports
                visitImportClause(node);
            }
        } else if (ts.isIdentifier(node)) {
            const symbol = checker.getSymbolAtLocation(node);
            if (symbol) addSymbol(symbol);
        }
        ts.forEachChild(node, visit);
    }

    for (const sourceFile of program.getSourceFiles()) {
        // Skip declaration files
        if (!sourceFile.isDeclarationFile) visit(sourceFile);

        // Calculate total existing symbols
        const sourceDirname = path.dirname(sourceFile.fileName);
        for (const moduleName of moduleNames) {
            if (sourceDirname.endsWith(moduleName)) visitModules(sourceFile);
        }
    }

    return { symbols: usedSymbols, parent: usedSymbolsByParent, allSymbols };

    function addSymbol(
        symbol: ts.Symbol,
        to = usedSymbols,
        byParent = usedSymbolsByParent,
    ): void {
        const declarations = symbol.getDeclarations();
        if (!declarations) return;

        // Check if declaration originates from specified module
        if (
            !declarations.some((declaration) => {
                const fileName = declaration.getSourceFile().fileName;
                return moduleNames.some((e) => fileName.includes(e));
            })
        )
            return;

        const symbols = declarations
            .map((e) => {
                const sourceFileName = path.dirname(e.getSourceFile().fileName);
                const moduleName = moduleNames.find((moduleName) =>
                    sourceFileName.endsWith(moduleName),
                );
                return { e, moduleName: moduleName ?? sourceFileName };
            })
            .map(({ e, moduleName }) => {
                const parent =
                    (ts.isClassDeclaration(e.parent) ||
                        ts.isEnumDeclaration(e.parent) ||
                        ts.isInterfaceDeclaration(e.parent)) &&
                    e.parent.name
                        ? e.parent.name.getText()
                        : false;

                return {
                    parent: parent,
                    name: symbol.getName(),
                    module: moduleName,
                };
            })
            .filter((e) => !!e);

        for (const symbol of symbols) {
            const parent =
                typeof symbol.parent === 'string' ? symbol.parent : 'global';

            byParent[symbol.module] ??= {};
            byParent[symbol.module][parent] ??= new Map();
            addSymbolToSymbolsMap(byParent[symbol.module][parent], symbol.name);

            to[symbol.module] ??= new Map();
            addSymbolToSymbolsMap(
                to[symbol.module],
                symbol.parent ? symbol.parent + '.' + symbol.name : symbol.name,
            );
        }
    }

    function addSymbolToSymbolsMap(
        map: Map<string, ScanReportSymbol>,
        name: string,
    ): void {
        const symbol = map.get(name);
        if (!symbol) map.set(name, { usages: 1 });
        else symbol.usages++;
    }

    function visitImportClause(node: ts.ImportDeclaration): void {
        if (!node.importClause?.namedBindings) return;

        const namedBindings = node.importClause.namedBindings;

        if (ts.isNamedImports(namedBindings)) {
            namedBindings.elements.forEach((element) => {
                const symbol = checker.getSymbolAtLocation(element.name);
                if (symbol) addSymbol(symbol);
            });
        } else {
            // Handle namespace imports (import * as from '...')
            const symbol = checker.getSymbolAtLocation(namedBindings.name);
            if (symbol) addSymbol(symbol);
        }
    }
}
