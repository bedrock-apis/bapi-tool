/**
 * This class is made for JS value nested validation
 */
export abstract class BaseValidator {
    protected constructor() {}
    public abstract name: string;
    /**
     * Validates recieved value
     * @param value Value to validate
     */
    public abstract validate(value: any, path: string[]): boolean;
    /**
     * Returns abstract object type
     */
    public abstract rawObjectType(): any;
}
