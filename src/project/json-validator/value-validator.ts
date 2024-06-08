import { BaseValueValidator } from "./general-validator";
import { ValidatorError } from "./validator-error";
import { ValueValidatorKind } from "./valider-kind";

export class StringValueValidator extends BaseValueValidator<ValueValidatorKind.String>{
    public readonly expected: string = "String"
    public constructor(){ super(ValueValidatorKind.String); }
    public validate(value: any, ...path: string[]): boolean {
        if(typeof value !== "string") throw new ValidatorError(path,this.expected + " expected, received " +  typeof value);
        return true;
    }
}

export class NumberValueValidator extends BaseValueValidator<ValueValidatorKind.Number>{
    public readonly expected: string = "Number"
    public constructor(){ super(ValueValidatorKind.Number); }
    public validate(value: any, ...path: string[]): boolean {
        if(typeof value !== "number") throw new ValidatorError(path,this.expected + " expected, received " +  typeof value);
        if(!isFinite(value)) throw new ValidatorError(path,"Finite value expected, received " + value);
        return true;
    }
}
export class AnyValueValidator extends BaseValueValidator<ValueValidatorKind.Any>{
    public readonly expected: string = "Any"
    public constructor(){ super(ValueValidatorKind.Any); }
    public validate(value: any, ...path: string[]): boolean { return true; }
}
export class BooleanValueValidator extends BaseValueValidator<ValueValidatorKind.Boolean>{
    public readonly expected: string = "Boolean"
    public constructor(){ super(ValueValidatorKind.Boolean); }
    public validate(value: any, ...path: string[]): boolean {
        if(typeof value !== "boolean") throw new ValidatorError(path,this.expected + " expected, received " +  typeof value);
        return true;
    }
}

export class MatchValueValidator extends BaseValueValidator<ValueValidatorKind.Match>{
    public get expected(){return String(this.value);};
    public readonly value;
    public constructor(expected: any){
        super(ValueValidatorKind.Match);
        this.value = expected;
    }
    public modifier?:(value: any)=>any;
    public validate(value: any, ...path: string[]): boolean {
        if((this.modifier?this.modifier(value):value) !== this.value) throw new ValidatorError(path,this.expected + " expected, received " + value);
        return true;
    }
}