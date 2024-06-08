import { BaseValueValidator } from "./general-validator";
import { ValidatorError } from "./validator-error";
import { ValueValidatorKind } from "./valider-kind";

export class CompoudValueValidator extends BaseValueValidator<ValueValidatorKind.Compoud>{
    public readonly expected: string = "Object";
    public constructor(options?: { [key: string]: {validator: BaseValueValidator<ValueValidatorKind>, optional?: boolean}}){ 
        super(ValueValidatorKind.Compoud); this.options = options??{};
    }
    public readonly options: { [key: string]: {validator: BaseValueValidator<ValueValidatorKind>, optional?: boolean} };
    public validate(value: any, ...path: string[]): boolean {
        if(typeof value !== "object") throw new ValidatorError(path,this.expected + " expected, received '" + typeof value + "'");
        for(const key of Object.keys(this.options)){
            const option = this.options[key];
            if(!option) continue;
            if(key in value) option.validator.validate(value[key], ...path, key)
            else if(option.optional) continue;
            else throw new ValidatorError(path,"Object property not found, property '" + key + "'");
        }
        return true;
    }
    public setOption(key: string, option: BaseValueValidator<ValueValidatorKind>, optional?: boolean){
        this.options[key] = {validator: option, optional};
        return this;
    }
}