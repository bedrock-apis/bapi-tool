import { ArrayValueValidator, CompoudValueValidator } from "../../json-validator";
import { BapiExportOptionsValidator } from "./export-options";
import { BapiPluginValidator } from "./plugin";
import { BapiWatchOptionsValidator } from "./watch-options";

export class BapiValueValidator extends CompoudValueValidator{
    constructor(){
        super();
        this.setOption("watchOptions", new BapiWatchOptionsValidator(), true);
        this.setOption("exportOptions", new BapiExportOptionsValidator(), true);
        this.setOption("plugins", new ArrayValueValidator(new BapiPluginValidator()), true);
    }
}