import path from 'node:path';
import ts from 'typescript';

export function createProgram(tsconfigPath: string) {
    tsconfigPath = path.resolve(tsconfigPath);
    console.log('Using', tsconfigPath);
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

    console.log(
        'Parsed config which includes',
        parsedConfig.fileNames.length,
        'files',
    );

    const program = ts.createProgram(
        parsedConfig.fileNames,
        parsedConfig.options,
    );

    return program;
}

export function scanForSymbolsUsedIn(
    moduleNames: string[],
    tsconfigPath: string,
    program = createProgram(tsconfigPath),
) {
    const checker = program.getTypeChecker();
    console.log('Scanning for', moduleNames);

    const usedSymbols: Record<string, Set<string>> = {};
    const usedSymbolsByParent: Record<string, Record<string, Set<string>>> = {};

    function visit(node: ts.Node) {
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
    }

    return { symbols: usedSymbols, parent: usedSymbolsByParent };

    function addSymbol(symbol: ts.Symbol, moduleName?: string) {
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
                if (!moduleName) return;
                const parent =
                    (ts.isClassDeclaration(e.parent) ||
                        ts.isEnumDeclaration(e.parent) ||
                        ts.isInterfaceDeclaration(e.parent)) &&
                    e.parent.name
                        ? e.parent.name.getText()
                        : false;

                if (!parent) console.log(e.parent.kind);

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

            usedSymbolsByParent[symbol.module] ??= {};
            usedSymbolsByParent[symbol.module][parent] ??= new Set();
            usedSymbolsByParent[symbol.module][parent].add(symbol.name);

            usedSymbols[symbol.module] ??= new Set();
            usedSymbols[symbol.module].add(
                symbol.parent ? symbol.parent + '.' + symbol.name : symbol.name,
            );
        }
    }

    function visitImportClause(node: ts.ImportDeclaration) {
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
export enum ScanReportFormat {
    Json = 'json',
    Pretty = 'pretty',
}
