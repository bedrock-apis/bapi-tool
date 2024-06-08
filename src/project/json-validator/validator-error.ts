export class ValidatorError extends TypeError{
    public readonly path: string[];
    public constructor(path: string[], message: string){ super(message + " at " + path.join("::")); this.path = path; }
}