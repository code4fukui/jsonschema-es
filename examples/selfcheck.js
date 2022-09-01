//import { validateAsync } from "https://code4fukui.github.io/jsonschema-es/lib/index.js";
//import { validateAsync } from "../lib/index.js";

import { Validator } from "../lib/index.js";

export const validateAsync = async (instance, schema, options) => {
  const validator = new Validator();
  validator.addSchema(schema);
  for (;;) {
    const nextSchema = validator.unresolvedRefs.shift();
    if (!nextSchema) {
      break;
    }
    const schema = await (await fetch(nextSchema)).json();
    validator.addSchema(schema);
  }
  const p = validator.validate(instance, schema, options);
  return p;
};

const schemafn = "jsonschema-draft04.schema.json";
const schema = JSON.parse(await Deno.readTextFile(schemafn));

const data = schema; // ok
//const data = { type: 1 }; // err
const p = await validateAsync(data, schema);
console.log(p);
