# avsc json sample

This lib allows you to generate sample json documents from an Apache Avro schema.

To use it you have to wrap your schema in an [avsc](https://github.com/mtth/avsc) schema and call the function `avscJsonSample()` from this library

## Sample usage

Install [avsc](https://www.npmjs.com/package/avsc) and [avsc-json-sample](https://www.npmjs.com/package/avsc-json-sample) libs

```shell
npm i avsc avsc-json-sample
```

Then use it in your code

```js
const avro = require("avsc");
const { avscJsonSample } = require("avsc-json-sample");

const avscType = avro.Type.forSchema({
  type: "record",
  fields: [
    { name: "kind", type: { type: "enum", symbols: ["CAT", "DOG"] } },
    { name: "name", type: "string" },
    { name: "age", type: "int" },
  ],
});

const jsonSample = avscJsonSample(avscType);
console.log(jsonSample); // { kind: 'CAT', name: 'string', age: 0 }
```

Have fun 🤩

## Useful links

- [Report an issue](https://github.com/javro/avsc-json-sample/issues/new)
- [avsc library](https://github.com/mtth/avsc)
- [avro specification](http://avro.apache.org/docs/current/spec.html)
