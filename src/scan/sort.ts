import { ScanSortMode } from './enums';
import {
    ScanReportModules,
    ScanReportSymbols,
    ScanReportSymbolsByParent,
} from './types';

function sort(
    keyA: string,
    sizeA: number,
    keyB: string,
    sizeB: number,
    mode: ScanSortMode,
) {
    if (mode === ScanSortMode.Key) return sortByKey(keyA, keyB);
    return sortBySize(sizeA, sizeB);
}

function sortBySize(sizeA: number, sizeB: number) {
    return sizeB - sizeA;
}

function sortByKey(keyA: string, keyB: string) {
    return keyA.localeCompare(keyB);
}

export function sortModules(
    modules: ScanReportModules,
    mode: ScanSortMode,
): ScanReportModules {
    return Object.fromEntries(
        Object.entries(modules)
            .sort((a, b) => sort(a[0], a[1].size, b[0], b[1].size, mode))
            .map(([k, v]) => [k, sortSymbols(v, mode)]),
    );
}
function sortSymbols(
    symbols: ScanReportSymbols,
    mode: ScanSortMode,
): ScanReportSymbols {
    return new Map(
        [...symbols.entries()].sort((a, b) =>
            sort(a[0], a[1].usages, b[0], b[1].usages, mode),
        ),
    );
}
export function sortSymbolsByParent(
    parent: ScanReportSymbolsByParent,
    mode: ScanSortMode,
): ScanReportSymbolsByParent {
    return Object.fromEntries(
        Object.entries(parent)
            .sort((a, b) =>
                sort(
                    a[0],
                    Object.keys(a[1]).length,
                    b[0],
                    Object.keys(b[1]).length,
                    mode,
                ),
            )
            .map(([k, v]) => [k, sortModules(v, mode)]),
    );
}
