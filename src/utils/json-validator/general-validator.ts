import { ValueValidatorKind } from "./valider-kind";

export abstract class BaseValueValidator<T extends ValueValidatorKind>{
    public readonly type: T;
    public readonly abstract expected: string;
    public constructor(type: T){
        this.type = type;
    }
    public isValid(value: any, ...path: string[]): boolean{
        try {
            this.validate(value, ...path);
            return true;
        } catch (error) {
            return false;
        }
    };
    public abstract validate(value: any, ...path: string[]): void;
}