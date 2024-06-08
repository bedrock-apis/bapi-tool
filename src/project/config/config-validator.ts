import { CompoudValueValidator, GeneralValidators, StringValueValidator } from "../../utils/json-validator";
import { BapiValueValidator, PacksValueValidator } from "./validators";
export const CONFIG_VALIDATOR = new CompoudValueValidator();

CONFIG_VALIDATOR.setOption("packs", new PacksValueValidator(), true)
.setOption("bapi", new BapiValueValidator(), true)
.setOption("name", GeneralValidators.String, true)
.setOption("author", GeneralValidators.String, true)