# jsonschema-es

[JSON schema](http://json-schema.org/)をバリデーションするライブラリで、高速かつ簡単に使えるよう設計されています。JSON Schemaのdraft-07までをフルサポートしています。

## 機能

- JSON Schemaのバリデーション(draft-07まで)
- カスタムフォーマットの追加
- エラーメッセージのカスタマイズ

## 使い方

### インストール

このライブラリはES Modulesで提供されているため、ES6対応のページやNodejsで使用できます。

```javascript
import { Validator } from "https://code4fukui.github.io/jsonschema-es/lib/validator.js";
```

### 基本的な使い方

```javascript
import { Validator } from "https://code4fukui.github.io/jsonschema-es/lib/validator.js";
var v = new Validator();
var instance = 4;
var schema = {"type": "number"};
console.log(v.validate(instance, schema));
```

### さらに簡単な使い方

```javascript
import { validate } from "./index.js";
console.log(validate(4, {"type": "number"}));
```

## ライセンス

MITライセンス