import ts from 'typescript';
import { ScanSortMode } from './enums';

export type ScanReportSymbolsByParent = Record<string, ScanReportModules>;

export type ScanReportSymbols = Map<string, ScanReportSymbol>;

export type ScanReportModules = Record<string, ScanReportSymbols>;

export interface ScanReportSymbol {
    usages: number;
    kind: string;
}

export interface ScanOptions {
    tsconfigPath: string;
    moduleNames: string[];
    extensions?: boolean;
    log?: (typeof console)['log'];
    program?: ts.Program;
    sortMode?: ScanSortMode;
    reportSyntaxKind?: boolean;
    reportUsage?: boolean;
}
export interface ScanReport {
    symbols: ScanReportModules;
    byParent: ScanReportSymbolsByParent;
    all: ScanReportModules;
}
