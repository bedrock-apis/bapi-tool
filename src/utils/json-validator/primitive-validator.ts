import { AbstractValueType } from './abstract-value-types';
import { BaseValidator } from './base-validator';
import { ValidatorLoader } from './general';
import { ValidationError } from './validation-error';

export class StringValidator extends BaseValidator {
    public name = AbstractValueType.string;
    public validValues?: string[];
    public caseCare?: boolean;
    public constructor() {
        super();
    }
    public validate(data: any, path: string[]): boolean {
        if (typeof data !== 'string')
            throw new ValidationError(
                "String expected, received '" + typeof data + "'",
                path
            );
        if (!this.validValues || this.validValues.length <= 0) return true;
        if (
            !this.validValues.includes(
                this.caseCare ? data : data.toLowerCase()
            )
        )
            throw new ValidationError(
                "Received string doesn't matches validValus, received '" +
                    data +
                    "', expected: " +
                    this.validValues.map((e) => `'${e}'`).join(', '),
                path
            );
        return true;
    }
    public rawObjectType(): any {
        const obj = {
            type: AbstractValueType.string,
            caseCare: this.caseCare,
        } as any;
        if (this.validValues?.length) obj.validValues = this.validValues;
        return obj;
    }
}
ValidatorLoader.RegisterType(AbstractValueType.string, (obj) => {
    const type = new StringValidator();
    type.validValues = obj.validvalues?.map((e: any) => String(e)) ?? [];
    type.caseCare = obj.caseCare;
    return type;
});
export class NumberValidator extends BaseValidator {
    public name = AbstractValueType.number;
    public max?: number = Number.MAX_SAFE_INTEGER;
    public min?: number = Number.MIN_SAFE_INTEGER;
    public constructor() {
        super();
    }
    public validate(data: any, path: string[]): boolean {
        if (typeof data !== 'number')
            throw new ValidationError(
                "Number expected, received '" + typeof data + "'",
                path
            );
        if (typeof this.max === 'number' && data > this.max)
            throw new ValidationError(
                `The number exceeds the maximum value, '${data}' is more than '${this.max}'"`,
                path
            );
        if (typeof this.min === 'number' && data < this.min)
            throw new ValidationError(
                `The number does not reach the minimum value, '${data}' is less than '${this.min}'"`,
                path
            );
        return true;
    }
    public rawObjectType(): any {
        return {
            type: AbstractValueType.number,
            min: this.min,
            max: this.max,
        };
    }
}
ValidatorLoader.RegisterType(AbstractValueType.number, (obj) => {
    const type = new NumberValidator();
    type.max = Number(obj.max ?? Number.MAX_SAFE_INTEGER);
    type.min = Number(obj.min ?? Number.MIN_SAFE_INTEGER);
    return type;
});
export class BooleanValidator extends BaseValidator {
    public name = AbstractValueType.boolean;
    public constructor() {
        super();
    }
    public validate(data: any, path: string[]): boolean {
        if (typeof data !== 'boolean')
            throw new ValidationError(
                "Boolean expected, received '" + typeof data + "'",
                path
            );
        return true;
    }
    public rawObjectType(): any {
        return { type: AbstractValueType.boolean };
    }
}
ValidatorLoader.RegisterType(AbstractValueType.boolean, (obj) => {
    return new BooleanValidator();
});
