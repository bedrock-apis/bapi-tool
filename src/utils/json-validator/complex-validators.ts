import { AbstractValueType } from "./abstract-value-types";
import { BaseValidator } from "./base-validator";
import { ValidatorLoader } from "./general";
import { ValidationError } from "./validation-error";

export class CompoudValidator extends BaseValidator{
    public name = AbstractValueType.compoud;
    public whitelisted: boolean = false;
    public properties: ObjectPropertyValidator[] = [];
    public constructor(){
        super();
    }
    public validate(value: any, path: string[]): boolean { 
        if(typeof value !== "object") throw new ValidationError("Object expected, received '"+(typeof value)+"'", path);
        for(const property of this.properties) 
            if(!(property.propertyName in value) && !property.isOptional) throw new ValidationError("Missing object property '" +property.propertyName+"'", path);
            else if(property.propertyName in value) return property.validate(value[property.propertyName], [...path, property.propertyName]);
        return true;
    }
    public rawObjectType() {
        return {
            type: AbstractValueType.compoud,
            whitelisted: this.whitelisted,
            properties: this.properties.map(e=>e.rawObjectType())
        }
    }
}

ValidatorLoader.RegisterType(AbstractValueType.compoud, (obj)=>{
    const type = new CompoudValidator();
    type.properties = obj.properties.map((e: any)=>ValidatorLoader.LoadType("__property", e));
    type.whitelisted = obj.whitelisted;
    return type;
});

export class ObjectPropertyValidator extends BaseValidator{
    public name = "__property";
    public type: BaseValidator;
    public propertyName: string;
    public isOptional: boolean = false;
    public constructor(type: BaseValidator, propertyName: string){
        super();
        this.type = type;
        this.propertyName = propertyName;
    }
    public validate(value: any, path: string[]): boolean { 
        return this.type.validate(value, path);
    }
    public rawObjectType() {
        const obj = this.type.rawObjectType();
        obj.name = this.propertyName;
        obj.optional = this.isOptional??false;
        return obj;
    }
}

ValidatorLoader.RegisterType("__property", (obj)=>{
    const type = new ObjectPropertyValidator(ValidatorLoader.LoadType(obj.type as string, obj), obj.name);
    type.isOptional = obj.optional;
    return type;
});

export class MapValidator extends BaseValidator{
    public name = AbstractValueType.map;
    public valueType: BaseValidator;
    public constructor(valueType: BaseValidator){
        super();
        this.valueType = valueType;
    }
    public validate(value: any, path: string[]): boolean { 
        if(typeof value !== "object") throw new ValidationError("Object expected, received '"+(typeof value)+"'", path);
        for(const property of Object.getOwnPropertyNames(value)) if(!this.valueType.validate(value[property], [...path, property])) return false;
        return true;
    }
    public rawObjectType() {
        return {
            type: AbstractValueType.map,
            valueType: this.valueType.rawObjectType()
        }
    }
}

ValidatorLoader.RegisterType(AbstractValueType.map, (obj)=>{
    return new MapValidator(ValidatorLoader.Load(obj.valueType));
});
export class ArrayValidator extends BaseValidator{
    public name = AbstractValueType.array;
    public valueType: BaseValidator;
    public constructor(valueType: BaseValidator){
        super();
        this.valueType = valueType;
    }
    public validate(value: any, path: string[]): boolean {
        if(!Array.isArray(value)) throw new ValidationError("Array expected, received '"+(typeof value)+"'", path);
        for(const [index, v] of value.entries()) if(!this.valueType.validate(v, [...path, `[${index}]`])) return false;
        return true;
    }
    public rawObjectType() {
        return {
            type: AbstractValueType.compoud,
            valueType: this.valueType.rawObjectType()
        }
    }
}
ValidatorLoader.RegisterType(AbstractValueType.array, (obj)=>{
    return new ArrayValidator(ValidatorLoader.Load(obj.valueType));
});

export class ComplexValidator extends BaseValidator{
    public name = AbstractValueType.complex;
    public validTypes: BaseValidator[];
    public constructor(){
        super();
        this.validTypes = [];
    }
    public validate(value: any, path: string[]): boolean {
        let lastError: any = null;
        for(const type of this.validTypes){
            try {
                type.validate(value, path);
                break;
            } catch (error) { lastError = error; }
        }
        if(lastError) throw new ValidationError(`Type of ${typeof value} doesn't match any of these allowed type: ${this.validTypes.map(e=>e.name)}`, path);
        return true;
    }
    public rawObjectType() {
        return {
            type: this.name,
            validTypes: this.validTypes.map(e=>e.rawObjectType())
        }
    }
}
ValidatorLoader.RegisterType(AbstractValueType.complex, (obj)=>{
    const base = new ComplexValidator();
    for(const type of obj.validTypes) base.validTypes.push(ValidatorLoader.Load(type));
    return base;
});