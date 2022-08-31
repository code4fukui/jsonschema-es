import { Validator } from "./validator.js";
import * as helpers from "./helpers.js";
import * as scanjs from "./scan.js";

export { Validator };
export const ValidatorResult = helpers.ValidatorResult;
export const ValidatorResultError = helpers.ValidatorResultError;
export const ValidationError = helpers.ValidationError;
export const SchemaError = helpers.SchemaError;
export const SchemaScanResult = scanjs.SchemaScanResult;
export const scan = scanjs.scan;

export const validate = (instance, schema, options) => {
  const v = new Validator();
  return v.validate(instance, schema, options);
};
