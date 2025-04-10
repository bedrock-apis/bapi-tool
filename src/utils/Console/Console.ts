import { stdin } from 'process';
import { createInterface } from 'node:readline/promises';
import { ConsoleReader } from './ConsoleReader';

export class Console {
    public CreateReader(): ConsoleReader {
        return new ConsoleReader(
            createInterface({ input: process.stdin, output: process.stdout })
        );
    }
    private _write(text: string | Buffer): Promise<boolean> {
        return new Promise<boolean>((res) =>
            process.stdout.write(text, (e) => res(Boolean(e)))
        );
    }
    WriteLine(...params: any): Promise<boolean> {
        return this._write(params.join() + '\r\n');
    }
    Write(...params: any): Promise<boolean> {
        return this._write(params.join());
    }
    async Type(text: string, speed: number = 0.5) {
        speed = 1 / speed;
        const n = speed > 1 ? 1 : 1 / speed;
        const d = speed > 1 ? speed : 1;
        let index = 0;
        let count = 0;
        while (index < text.length) {
            let code = '';
            count -= n;
            while (count < 0 && index < text.length) {
                code += text[index++];
                count++;
            }
            await this._write(code);
            await new Promise((res) => setTimeout(res, d));
        }
    }
    async TypeLine(text: string, speed?: number) {
        await this.Type(text, speed);
        await this._write('\r\n');
    }
}
Object.setPrototypeOf(Console.prototype, globalThis.console);
export const console: Console & (typeof globalThis)['console'] =
    new Console() as any;
