import { ValidatorLoader } from "../../utils/json-validator";
import data from "../../validators/config";

export const CONFIG_VALIDATOR = ValidatorLoader.Load(data);

/*new CompoudValueValidator();

CONFIG_VALIDATOR.setOption("packs", new PacksValueValidator(), true)
.setOption("bapi", new BapiValueValidator(), true)
.setOption("name", GeneralValidators.String, true)
.setOption("author", GeneralValidators.String, true)*/