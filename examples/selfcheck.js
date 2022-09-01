//import { validateAsync } from "https://code4fukui.github.io/jsonschema-es/lib/index.js";
import { validateAsync } from "../lib/index.js";

const schemafn = "jsonschema-draft04.schema.json";
const schema = JSON.parse(await Deno.readTextFile(schemafn));

const data = schema; // ok
//const data = { type: 1 }; // err
const p = await validateAsync(data, schema);
console.log(p);
