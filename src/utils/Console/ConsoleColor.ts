import { ColorLike, TextFormatter } from "./TextFormatter";

interface ConsoleColorConstructor{
    (r: number, g: number, b: number, background?: boolean): ConsoleColor;
    new (r: number, g: number, b: number, background?: boolean): ConsoleColor;
    readonly prototype: ConsoleColor;
    readonly name: "ConsoleColor";
    from(color?: ColorLike): ConsoleColor;
    readonly RESET: string;
    readonly RESET_BACKGROUND: string;
    readonly RESET_FOREGROUND: string;
}
export interface ConsoleColor{
    r: number;
    g: number;
    b: number;
    background: boolean;
    getCode(): string;
}
export const ConsoleColor = function ConsoleColor(this: ConsoleColor, r, g, b, background){
    if(new.target){
        this.r = r;
        this.g = g;
        this.b = b;
        this.background = background??false;
    } else return new (ConsoleColor as any)(r,g,b);
} as ConsoleColorConstructor;
Object.assign(ConsoleColor, {
    RESET: TextFormatter.RESET,
    RESET_BACKGROUND: TextFormatter.RESET_BACKGROUND,
    RESET_FOREGROUND: TextFormatter.RESET_FOREGROUND,
    from(color?: ColorLike, background?: boolean){
        if(typeof color === "string" && color.startsWith("#")) color = parseInt(color.substring(1),16);
        else if(typeof color === "bigint") color = Number(color);
        if(typeof color === "number"){
            color = Math.ceil(color);
            const b = color & 0xff;
            const g = (color>>8) & 0xff;
            const r = (color>>16) & 0xff;
            color = {r,g,b};
        }
        if(typeof color === "object"){
            const {r,g,b} = color;
            return new ConsoleColor(Number(r), Number(g), Number(b), background);
        }
        else throw TypeError("Unknow color value: " + color);
    }
});
(ConsoleColor as Function).prototype = {
    getCode(){ return this.toString(); },
    toString(){ return TextFormatter.GetColorCode(this.r, this.g, this.b, this.background); }
};



/*
export class ConsoleColor{
    public r: number;
    public g: number;
    public b: number;
    public constructor(r: number, g: number, b: number){
        this.r = r;
        this.g = g;
        this.b = b;
    }

}*/