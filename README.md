# jsonschema-es

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

[JSON schema](http://json-schema.org/) validator, which is designed to be fast and simple to use. JSON Schema versions through draft-07 are fully supported.

## Contributing & bugs

Please fork the repository, make the changes in your fork and include tests. Once you're done making changes, send in a pull request.

### Bug reports

Please include a test which shows why the code fails.

## Usage

### Simple

Simple object validation using JSON schemas.

```javascript
import { Validator } from "https://code4fukui.github.io/jsonschema-es/lib/validator.js";
var v = new Validator();
var instance = 4;
var schema = {"type": "number"};
console.log(v.validate(instance, schema));
```

### Even simpler

```javascript
import { validate } from "./index.js";
console.log(validate(4, {"type": "number"}));
```

### Complex example, with split schemas and references

```javascript
import { Validator } from "./validator.js";
var v = new Validator();

// Address, to be embedded on Person
var addressSchema = {
  "id": "/SimpleAddress",
  "type": "object",
  "properties": {
    "lines": {
      "type": "array",
      "items": {"type": "string"}
    },
    "zip": {"type": "string"},
    "city": {"type": "string"},
    "country": {"type": "string"}
  },
  "required": ["country"]
};

// Person
var schema = {
  "id": "/SimplePerson",
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "address": {"$ref": "/SimpleAddress"},
    "votes": {"type": "integer", "minimum": 1}
  }
};

var p = {
  "name": "Barack Obama",
  "address": {
    "lines": [ "1600 Pennsylvania Avenue Northwest" ],
    "zip": "DC 20500",
    "city": "Washington",
    "country": "USA"
  },
  "votes": "lots"
};

v.addSchema(addressSchema, '/SimpleAddress');
console.log(v.validate(p, schema));
```
### Example for Array schema

```javascript
var arraySchema = {
        "type": "array",
        "items": {
            "properties": {
                "name": { "type": "string" },
                "lastname": { "type": "string" }
            },
            "required": ["name", "lastname"]
        }
    }
```
For a comprehensive, annotated example illustrating all possible validation options, see [examples/all.js](./examples/all.js)

## Features

### Definitions

All schema definitions are supported, $schema is ignored.

### Types

All types are supported

### Handling `undefined`

`undefined` is not a value known to JSON, and by default, the validator treats it as if it is not invalid. i.e., it will return valid.

```javascript
var res = validate(undefined, {type: 'string'});
res.valid // true
```

This behavior may be changed with the "required" option:

```javascript
var res = validate(undefined, {type: 'string'}, {required: true});
res.valid // false
```

### Formats

#### Disabling the format keyword.

You may disable format validation by providing `disableFormat: true` to the validator
options.

#### String Formats

All formats are supported, phone numbers are expected to follow the [E.123](http://en.wikipedia.org/wiki/E.123) standard.

#### Custom Formats

You may add your own custom format functions.  Format functions accept the input
being validated and return a boolean value.  If the returned value is `true`, then
validation succeeds.  If the returned value is `false`, then validation fails.

* Formats added to `Validator.prototype.customFormats` do not affect previously instantiated
Validators.  This is to prevent validator instances from being altered once created.
It is conceivable that multiple validators may be created to handle multiple schemas
with different formats in a program.
* Formats added to `validator.customFormats` affect only that Validator instance.

Here is an example that uses custom formats:

```javascript
Validator.prototype.customFormats.myFormat = function(input) {
  return input === 'myFormat';
};

var validator = new Validator();
validator.validate('myFormat', {type: 'string', format: 'myFormat'}).valid; // true
validator.validate('foo', {type: 'string', format: 'myFormat'}).valid; // false
```

### Results

By default, results will be returned in a `ValidatorResult` object with the following properties:

* `instance`: any.
* `schema`: Schema.
* `errors`: ValidationError[].
* `valid`: boolean.

Each item in `errors` is a `ValidationError` with the following properties:

* path: array. An array of property keys or array offsets, indicating where inside objects or arrays the instance was found.
* property: string. Describes the property path. Starts with `instance`, and is delimited with a dot (`.`).
* message: string. A human-readable message for debugging use. Provided in English and subject to change.
* schema: object. The schema containing the keyword that failed
* instance: any. The instance that failed
* name: string. The keyword within the schema that failed.
* argument: any. Provides information about the keyword that failed.

The validator can be configured to throw in the event of a validation error:

* If the `throwFirst` option is set, the validator will terminate validation at the first encountered error and throw a `ValidatorResultError` object.

* If the `throwAll` option is set, the validator will throw a `ValidatorResultError` object after the entire instance has been validated.

* If the `throwError` option is set, it will throw at the first encountered validation error (like `throwFirst`), but the `ValidationError` object itself will be thrown. Note that, despite the name, this does not inherit from Error like `ValidatorResultError` does.

The `ValidatorResultError` object has the same properties as `ValidatorResult` and additionally inherits from Error.

#### "nestedErrors" option

When `oneOf` or `anyOf` validations fail, errors that caused any of the sub-schemas referenced therein to fail are normally suppressed, because it is not necessary to fix all of them. And in the case of `oneOf`, it would itself be an error to fix all of the listed errors.

This behavior may be configured with `options.nestedErrors`. If truthy, it will emit all the errors from the subschemas. This option may be useful when troubleshooting validation errors in complex schemas.

### Custom keywords

Specify your own JSON Schema keywords with the validator.attributes property.