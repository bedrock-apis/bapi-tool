import { BaseValueValidator } from "./general-validator";
import { ValidatorError } from "./validator-error";
import { ValueValidatorKind } from "./valider-kind";
import { MatchValueValidator } from "./value-validator";

export class MultipleValueValidator extends BaseValueValidator<ValueValidatorKind.Multiple>{
    public get expected(){return this.options.map(e=>e.expected).join(" | ");}
    public constructor(options?: BaseValueValidator<ValueValidatorKind>[]){ super(ValueValidatorKind.Multiple); this.options = options??[]; }
    public readonly options: BaseValueValidator<ValueValidatorKind>[];
    public validate(value: any, ...path: string[]): boolean {
        for(const type of this.options){
            try {
                type.validate(value, ...path);
                return true;
            } catch {}
        }
        throw new ValidatorError(path,`"${this.expected}" expected, received "${value}"`);
    }
    public addOption(option: BaseValueValidator<ValueValidatorKind>){
        this.options.push(option);
        return this;
    }
    public static FromMatch(types: any[]): MultipleValueValidator{
        return new MultipleValueValidator(types.map(e=>new MatchValueValidator(e)));
    }
}