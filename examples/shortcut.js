import { validate } from "../lib/index.js";

var instance = 4;
var schema = {"type": "number"};
console.log(validate(instance, schema));
