import { validate } from "../lib/index.js";

const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "age": {
            "type": "integer",
            "minimum": 0
        },
        "hobbies": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "required": ["name"]
};
const json = {
    "name": "山田太郎",
    "age": 42,
    "hobbies": ["野球", "柔道"]
};
const res = validate(json, schema);
console.log(res.errors.length == 0);
