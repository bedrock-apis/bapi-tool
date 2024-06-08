import { Interface } from "readline/promises";

export class ConsoleReader{
    protected readonly input: Interface;
    constructor(input: Interface){
        this.input = input;
    }
    close(){ this.input.close(); }
    ReadLineAsync(question?: string): Promise<string>{ return this.input.question(question??""); }
}
