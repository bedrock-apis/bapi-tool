
import { BaseValidator } from "./base-validator";

export class ValidatorLoader{
    public static loaders = new Map<string, (data: any)=>BaseValidator>();
    public static RegisterType(type: string, loader: (obj: any)=>BaseValidator): void{
        this.loaders.set(type, loader);
    }
    public static Load(object: any): BaseValidator{ return this._load(object); }
    public static LoadType(type: string, object: any){
        return this.loaders.get(type)?.(object)!;
    }
    protected static _load(object: any): any{
        if(typeof object.type !== "string") throw new SyntaxError("Validator data structure is not valid: " + JSON.stringify(object));
        return this.LoadType(object.type, object);
    }
}