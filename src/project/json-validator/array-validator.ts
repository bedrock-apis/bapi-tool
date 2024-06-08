import { BaseValueValidator } from "./general-validator";
import { ValidatorError } from "./validator-error";
import { ValueValidatorKind } from "./valider-kind";

export class ArrayValueValidator extends BaseValueValidator<ValueValidatorKind.Array>{
    public readonly expected: string = "Array"
    public constructor(validOption: BaseValueValidator<ValueValidatorKind>){ 
        super(ValueValidatorKind.Array);
        this.validOption = validOption;
    }
    public readonly validOption: BaseValueValidator<ValueValidatorKind>;
    public validate(arr: any, ...path: string[]): boolean {
        if(!Array.isArray(arr)) throw new ValidatorError(path,this.expected + " expected, received '" +  typeof arr + "'");
        let i = 0;
        for(const value of arr) this.validOption.validate(value, ...path, `[${i++}]`);
        return true;
    }
}