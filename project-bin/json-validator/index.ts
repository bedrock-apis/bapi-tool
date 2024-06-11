import { BaseValueValidator } from "./general-validator";
import { ValueValidatorKind } from "./valider-kind";
import { StringValueValidator } from "./value-validator";

export * from "./valider-kind";
export * from "./validator-error";
export * from "./value-validator";
export * from "./general-validator";
export * from "./compoud-validator";
export * from "./array-validator";
export * from "./multiple-validator";
export * from "./general";

export enum ValidatorDataTypes{
    "compoud" = "compoud",
    "string" = "string",
    "number" = "number",
    "map" = "map",
    "array" = "array"
}

export class ValidatorLoader{
    public static Load(object: any): BaseValueValidator<ValueValidatorKind.Any>{ return this._load(object); }
    protected static _load(object: any): any{
        if(typeof object.type !== "string") throw new SyntaxError("Validator data structure is not valid: " + JSON.stringify(object));
        switch(object.type){
            case ValidatorDataTypes.string:
                return new StringValueValidator();
        }
    }
}