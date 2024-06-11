import { ArrayValueValidator } from "./array-validator";
import { CompoudValueValidator } from "./compoud-validator";
import { AnyValueValidator, BooleanValueValidator, NumberValueValidator, StringValueValidator } from "./value-validator";

export interface GeneralValidators {
   readonly "String": StringValueValidator;
   readonly "Number": NumberValueValidator;
   readonly "Boolean": BooleanValueValidator;
   readonly "Object": CompoudValueValidator;
   readonly "Array": ArrayValueValidator;
   readonly "Any": AnyValueValidator;
}

export const GeneralValidators = {
    "String": new StringValueValidator(),
    "Number": new NumberValueValidator(),
    "Boolean": new BooleanValueValidator(),
    "Object": new CompoudValueValidator(),
    "Array": new ArrayValueValidator(new AnyValueValidator()),
    "Any": new AnyValueValidator()
} as GeneralValidators;

