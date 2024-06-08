import { ProjectWatchMode } from "../../../enums";
import { CompoudValueValidator, MultipleValueValidator } from "../../json-validator";

export class BapiWatchOptionsValidator extends CompoudValueValidator{
    constructor(){
        super();
        this.setOption("mode", MultipleValueValidator.FromMatch([
            ProjectWatchMode.general,
            ProjectWatchMode.multipack
        ]), false);
    }
}