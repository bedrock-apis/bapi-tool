import { ProjectExportType } from "../../../enums";
import { CompoudValueValidator, MultipleValueValidator, StringValueValidator } from "../../../utils/json-validator";

export class BapiExportOptionsValidator extends CompoudValueValidator{
    constructor(){
        super();
        this.setOption("outDir", new StringValueValidator(), true);
        this.setOption("exportType", MultipleValueValidator.FromMatch([
            ProjectExportType.mcaddon,
            ProjectExportType.mcpack
        ]), false);
    }
}