import { ConsoleColor } from "./ConsoleColor";

export class ProgressBar{
    public readonly size;
    public readonly primaryColor: string;
    public readonly secundaryColor: string;
    public showProgress: boolean;
    public progress: number;
    public char: string = "█";
    public char2: string = "█";
    constructor(primaryColor: ConsoleColor, secundaryColor?: ConsoleColor, size?: number, showProgress?: boolean){
        this.size = Math.ceil(size??10);
        this.progress = 0;
        this.showProgress = showProgress??true;
        this.primaryColor = primaryColor.getCode();
        this.secundaryColor = secundaryColor?.getCode()??ConsoleColor.RESET;
    }
    SetProgress(p?: number){
        this.progress = p??0;
        return this;
    }
    SetShowProgress(show?: boolean){
        this.showProgress = show??false;
        return this;
    }
    SetProgressBarCharacters(first?: string, second?: string){
        this.char2 = this.char = first??"█";
        if(second) this.char2 = second;
        return this;
    }
    SetProgressBarCharacter1(p?: string){
        this.char = p??"█";
        return this;
    }
    SetProgressBarCharacter2(p?: string){
        this.char2 = p??"█";
        return this;
    }
    toString(){
        const {primaryColor, secundaryColor, size, progress, showProgress, char, char2} = this;
        return `\r${primaryColor}${char.repeat(Math.ceil(size*progress))}${secundaryColor}${char2.repeat(size - Math.ceil(size*progress))}\x1b[0m${showProgress?`  ${(progress*100).toFixed(0)}%`:" "}`;
    }
}