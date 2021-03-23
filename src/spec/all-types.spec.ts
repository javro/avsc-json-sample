import { avscJsonSample } from "../index";

test("Avro with record as root and all basic types", () => {
  const result = avscJsonSample({
    namespace: "com.namespace",
    name: "test",
    type: "record",
    fields: [
      {
        name: "stringField",
        type: "string",
      },

      {
        name: "intField",
        type: "int",
      },
      {
        name: "longField",
        type: "long",
      },
      {
        name: "doubleField",
        type: "double",
      },
      {
        name: "floatField",
        type: "float",
      },
      {
        name: "booleanField",
        type: "boolean",
      },
      {
        name: "nullField",
        type: "null",
      },
      {
        name: "bytesField",
        type: "bytes",
      },
      {
        name: "unwrappedUnionField",
        type: ["null", "string"],
      },
      {
        name: "unwrappedUnionFieldWithOneField",
        type: ["null"],
      },
      {
        name: "wrappedUnionField",
        type: [
          {
            type: "record",
            name: "Nested1",
            fields: [{ name: "nested1Field", type: "string" }],
          },
          {
            type: "record",
            name: "Nested2",
            fields: [{ name: "nested2Field", type: "string" }],
          },
        ],
      },
      {
        name: "arrayField",
        type: {
          type: "array",
          items: {
            name: "ArrayChild",
            type: "record",
            fields: [{ name: "arrayChildFieldName", type: "string" }],
          },
        },
      },
      {
        name: "enumField",
        type: {
          name: "EnumFieldType",
          type: "enum",
          symbols: ["VALUE1", "VALUE2"],
        },
      },
      {
        name: "fixedField",
        type: { type: "fixed", size: 16, name: "FixedType" },
      },
      {
        name: "mapField",
        type: {
          name: "MapType",
          type: "map",
          values: "string",
        },
      },
    ],
  });

  expect(result).toEqual({
    stringField: "string",
    intField: 0,
    longField: 0,
    doubleField: 0.1,
    floatField: 0.1,
    booleanField: true,
    nullField: null,
    bytesField: "\u00FF",
    unwrappedUnionField: "string",
    unwrappedUnionFieldWithOneField: null,
    wrappedUnionField: {
      "com.namespace.Nested1": {
        nested1Field: "string",
      },
      "com.namespace.Nested2": {
        nested2Field: "string",
      },
    },
    arrayField: [{ arrayChildFieldName: "string" }],
    enumField: "VALUE1",
    fixedField: "aaaaaaaaaaaaaaaa",
    mapField: {
      key: "string",
    },
  });
});
