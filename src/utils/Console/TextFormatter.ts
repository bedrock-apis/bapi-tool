export type ColorLike =
    | number
    | string
    | bigint
    | { r: number | bigint; g: number | bigint; b: number | bigint };
export class TextFormatter {
    public static readonly RESET = `\x1b[0m`;
    public static readonly RESET_BACKGROUND = `\x1b[49m`;
    public static readonly RESET_FOREGROUND = `\x1b[39m`;
    public static GetColorCode(
        r: number,
        g: number,
        b: number,
        background?: boolean
    ) {
        return `\x1b[${background ? 4 : 3}8;2;${r};${g};${b}m`;
    }
}
