export class ValidationError extends Error{
    public path: string[];
    public constructor(message: string, path: string[]){
        super(message + " at " + path.join("->"));
        this.path = path;
    }
}