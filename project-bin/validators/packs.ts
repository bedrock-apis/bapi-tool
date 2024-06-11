import { CompoudValueValidator, StringValueValidator } from "../../../utils/json-validator";

export class PacksValueValidator extends CompoudValueValidator{
    constructor(){
        super();
        this.setOption("behaviorPack", new StringValueValidator(), true);
        this.setOption("resourcePack", new StringValueValidator(), true);
    }
}