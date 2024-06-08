import { CompoudValueValidator, StringValueValidator } from "../../../utils/json-validator";

export class BapiPluginValidator extends CompoudValueValidator{
    constructor(){
        super();
        this.setOption("name", new StringValueValidator())
        this.setOption("version", new StringValueValidator())
        this.setOption("settings", new CompoudValueValidator())
    }
}